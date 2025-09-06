import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, FileText, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  _id: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
  motif?: string;
  diagnostic?: string;
}

interface MedicalRecordItem {
  _id: string;
  date: string;
  doctor: string;
  diagnostic: string;
  traitement: string;
  notes: string;
}

const DashboardUtilisateurs: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role === 'admin') navigate('/admin');
      loadAppointments(parsedUser._id, token);
      loadMedicalRecords(parsedUser._id, token);
    }
  }, [navigate]);

  const loadAppointments = async (userId: string, token: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Erreur récupération rendez-vous:', err);
    }
  };

  const loadMedicalRecords = async (patientId: string, token: string) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/medical-records/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedicalRecords(res.data?.consultations || []);
    } catch (err) {
      console.error('Erreur récupération dossier médical:', err);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(prev => prev.map(apt => apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt));
    } catch (err) {
      console.error("Erreur annulation rendez-vous :", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setActiveTab('overview');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulé';
      default: return '';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre espace personnel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon Espace Personnel</h1>
            <p className="text-gray-600">Bienvenue, {user.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-400" />
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="bg-white rounded-lg shadow-sm p-4">
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Calendar className="h-5 w-5 inline mr-2" /> Vue d'ensemble
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('appointments')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Clock className="h-5 w-5 inline mr-2" /> Mes Rendez-vous
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('medical')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'medical' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <FileText className="h-5 w-5 inline mr-2" /> Dossier Médical
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <User className="h-5 w-5 inline mr-2" /> Mon Profil
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                <div className="bg-blue-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-blue-600" /></div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Prochain RDV</p>
                  <p className="text-lg font-semibold">{appointments.filter(a => a.status !== 'cancelled')[0]?.date || 'Aucun'}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                <div className="bg-green-100 p-3 rounded-full"><Clock className="h-6 w-6 text-green-600" /></div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">RDV Total</p>
                  <p className="text-lg font-semibold">{appointments.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                <div className="bg-purple-100 p-3 rounded-full"><FileText className="h-6 w-6 text-purple-600" /></div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Consultations</p>
                  <p className="text-lg font-semibold">{medicalRecords.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mes Rendez-vous */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Mes Rendez-vous</h3>
                <button
                  onClick={() => navigate('/appointment')}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Prendre un rendez-vous
                </button>
              </div>

              {appointments.length === 0 ? (
                <p className="text-gray-600">Vous n'avez aucun rendez-vous.</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <p><strong>Service :</strong> {apt.service}</p>
                        <p><strong>Médecin :</strong> {apt.doctor}</p>
                        <p><strong>Date :</strong> {apt.date}</p>
                        <p><strong>Heure :</strong> {apt.time}</p>
                        {apt.motif && <p><strong>Motif :</strong> {apt.motif}</p>}
                        {apt.notes && <p><strong>Notes :</strong> {apt.notes}</p>}
                        {apt.diagnostic && <p><strong>Diagnostic :</strong> {apt.diagnostic}</p>}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(apt.status)}`}>
                          {getStatusText(apt.status)}
                        </span>
                        {apt.status !== 'cancelled' && (
                          <button
                            onClick={() => cancelAppointment(apt._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors text-sm"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dossier Médical */}
          {activeTab === 'medical' && (
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Dossier Médical</h3>
              {medicalRecords.map((record) => (
                <div key={record._id} className="border border-gray-200 rounded-lg p-4">
                  <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                  <p><strong>Médecin:</strong> {record.doctor}</p>
                  <p><strong>Diagnostic:</strong> {record.diagnostic}</p>
                  <p><strong>Traitement:</strong> {record.traitement}</p>
                  <p><strong>Notes:</strong> {record.notes}</p>
                </div>
              ))}
            </div>
          )}

          {/* Profil */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Ici tu peux ajouter les infos de profil */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUtilisateurs;
