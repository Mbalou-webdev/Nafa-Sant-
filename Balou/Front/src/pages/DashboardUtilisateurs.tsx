import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, FileText, Bell, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  _id: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'confirmé' | 'en attente' | 'annulé' | string;
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
      console.log('🚫 Annulation du rendez-vous:', appointmentId);
      
      // Utiliser la nouvelle route sécurisée d'annulation
      await axios.patch(
        `http://localhost:5000/api/appointments/${appointmentId}/cancel`,
        {}, // Corps vide, le statut est géré côté serveur
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      // Mettre à jour l'état local
      setAppointments(prev => prev.map(apt => 
        apt._id === appointmentId ? { ...apt, status: 'annulé' } : apt
      ));
      
      console.log('✅ Rendez-vous annulé avec succès');
    } catch (err: any) {
      console.error("Erreur annulation rendez-vous :", err.response?.data || err.message);
      
      // Afficher un message d'erreur approprié
      const errorMessage = err.response?.data?.message || "Erreur lors de l'annulation du rendez-vous";
      alert(errorMessage);
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
      case 'confirmed': 
      case 'confirmé': 
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': 
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': 
      case 'annulé':
        return 'bg-red-100 text-red-800 border-red-200';
      default: 
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmed': 
      case 'confirmé': 
        return 'Confirmé';
      case 'pending': 
      case 'en attente':
        return 'En attente de confirmation';
      case 'cancelled': 
      case 'annulé':
        return 'Annulé';
      default: 
        return status || 'Non défini';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'confirmed': 
      case 'confirmé': 
        return <CheckCircle className="h-4 w-4" />;
      case 'pending': 
      case 'en attente':
        return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': 
      case 'annulé':
        return <XCircle className="h-4 w-4" />;
      default: 
        return <Info className="h-4 w-4" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch(status) {
      case 'confirmed': 
      case 'confirmé': 
        return 'Votre rendez-vous est confirmé. Veuillez vous présenter à l\'heure prévue.';
      case 'pending': 
      case 'en attente':
        return 'Votre demande de rendez-vous a été reçue. Vous recevrez une confirmation sous peu.';
      case 'cancelled': 
      case 'annulé':
        return 'Ce rendez-vous a été annulé. Contactez-nous pour reprogrammer.';
      default: 
        return 'Statut en cours de traitement.';
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
            <div className="space-y-6">
              {/* Notifications de statut */}
              {appointments.filter(apt => apt.status === 'pending' || apt.status === 'en attente').length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">
                        Rendez-vous en attente de confirmation
                      </h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Vous avez {appointments.filter(apt => apt.status === 'pending' || apt.status === 'en attente').length} rendez-vous en attente de confirmation. Nous vous contacterons bientôt.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rendez-vous confirmés à venir */}
              {appointments.filter(apt => 
                (apt.status === 'confirmed' || apt.status === 'confirmé') && 
                new Date(apt.date) > new Date()
              ).length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">
                        Rendez-vous confirmés
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        Vous avez {appointments.filter(apt => 
                          (apt.status === 'confirmed' || apt.status === 'confirmé') && 
                          new Date(apt.date) > new Date()
                        ).length} rendez-vous confirmés à venir. N'oubliez pas vos rendez-vous !
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-blue-600" /></div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Prochain RDV</p>
                    <p className="text-lg font-semibold">
                      {(() => {
                        const nextAppt = appointments
                          .filter(a => (a.status === 'confirmed' || a.status === 'confirmé') && new Date(a.date) > new Date())
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                        return nextAppt ? new Date(nextAppt.date).toLocaleDateString('fr-FR') : 'Aucun';
                      })()}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                  <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-green-600" /></div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">RDV Confirmés</p>
                    <p className="text-lg font-semibold">
                      {appointments.filter(a => a.status === 'confirmed' || a.status === 'confirmé').length}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full"><AlertCircle className="h-6 w-6 text-yellow-600" /></div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">En Attente</p>
                    <p className="text-lg font-semibold">
                      {appointments.filter(a => a.status === 'pending' || a.status === 'en attente').length}
                    </p>
                  </div>
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
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Vous n'avez aucun rendez-vous.</p>
                  <p className="text-gray-500 text-sm">Cliquez sur le bouton ci-dessus pour prendre votre premier rendez-vous.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {appointments.map((apt) => (
                    <div key={apt._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      {/* Header avec statut */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{apt.service}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-gray-400 mr-2" />
                              <span><strong>Médecin :</strong> {apt.doctor}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span><strong>Date :</strong> {new Date(apt.date).toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span><strong>Heure :</strong> {apt.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Badge de statut amélioré */}
                        <div className="ml-4">
                          <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(apt.status)}`}>
                            {getStatusIcon(apt.status)}
                            <span className="ml-2">{getStatusText(apt.status)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message d'information sur le statut */}
                      <div className={`p-3 rounded-lg mb-4 ${
                        apt.status === 'confirmed' || apt.status === 'confirmé' ? 'bg-green-50 border border-green-200' :
                        apt.status === 'pending' || apt.status === 'en attente' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-start">
                          <div className={`mt-0.5 ${
                            apt.status === 'confirmed' || apt.status === 'confirmé' ? 'text-green-600' :
                            apt.status === 'pending' || apt.status === 'en attente' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {getStatusIcon(apt.status)}
                          </div>
                          <p className={`ml-2 text-sm ${
                            apt.status === 'confirmed' || apt.status === 'confirmé' ? 'text-green-700' :
                            apt.status === 'pending' || apt.status === 'en attente' ? 'text-yellow-700' :
                            'text-red-700'
                          }`}>
                            {getStatusMessage(apt.status)}
                          </p>
                        </div>
                      </div>

                      {/* Détails supplémentaires */}
                      {(apt.motif || apt.notes || apt.diagnostic) && (
                        <div className="border-t pt-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Détails supplémentaires :</h5>
                          <div className="space-y-2 text-sm">
                            {apt.motif && (
                              <div className="flex">
                                <span className="font-medium text-gray-600 w-20">Motif :</span>
                                <span className="text-gray-800">{apt.motif}</span>
                              </div>
                            )}
                            {apt.notes && (
                              <div className="flex">
                                <span className="font-medium text-gray-600 w-20">Notes :</span>
                                <span className="text-gray-800">{apt.notes}</span>
                              </div>
                            )}
                            {apt.diagnostic && (
                              <div className="flex">
                                <span className="font-medium text-gray-600 w-20">Diagnostic :</span>
                                <span className="text-gray-800">{apt.diagnostic}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      {(apt.status !== 'cancelled' && apt.status !== 'annulé') && (
                        <div className="border-t pt-4 flex justify-end">
                          <button
                            onClick={() => {
                              if (window.confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) {
                                cancelAppointment(apt._id);
                              }
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Annuler le rendez-vous
                          </button>
                        </div>
                      )}
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
