import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/appointments.css';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Filter,
  AlertCircle,
  Loader2,
  FileText,
  ClipboardList,
  Users,
  Activity,
  TrendingUp,
  Plus,
  Eye,
  Edit3,
  Mail,
  Phone,
  MapPin,
  RefreshCw
} from "lucide-react";

interface Appointment {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  service: string;
  date: string;
  time: string;
  doctorName: string;
  notes?: string;
  diagnostic?: string;
  status: string;
  createdAt: string;
}

interface User {
  id: string;
  role: "admin" | "user";
}

// Supposons que tu récupères l'utilisateur connecté quelque part
const currentUser: User = { id: "123", role: "admin" }; // à adapter selon ton auth

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string>("");

  // 🔹 Récupération de tous les rendez-vous
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Token d'authentification manquant. Veuillez vous reconnecter.");
          return;
        }

        const res = await axios.get<Appointment[]>(
          "http://localhost:5000/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setAppointments(res.data);
      } catch (err: any) {
        console.error("❌ Erreur de récupération :", err);
        if (err.response?.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
        } else {
          setError("Impossible de charger les rendez-vous. Veuillez réessayer.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setActionLoading(id);
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/appointments/${id}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err: any) {
      console.error("❌ Erreur de mise à jour :", err);
      setError("Erreur lors de la mise à jour du statut.");
    } finally {
      setActionLoading("");
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) return;
    try {
      setActionLoading(id);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err: any) {
      console.error("❌ Erreur lors de la suppression :", err);
      setError("Erreur lors de la suppression du rendez-vous.");
    } finally {
      setActionLoading("");
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      (filter === "all" || (appt.status && appt.status.toLowerCase() === filter)) &&
      ((appt.doctorName && appt.doctorName.toLowerCase().includes(search.toLowerCase())) ||
        (appt.service && appt.service.toLowerCase().includes(search.toLowerCase())))
  );

  const getStatusConfig = (status: string) => {
    if (!status) {
      return { bg: "bg-slate-50 border-slate-200", text: "text-slate-700", dot: "bg-slate-500" };
    }
    const configs: Record<string, { bg: string; text: string; dot: string }> = {
      confirmé: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
      "en attente": { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
      annulé: { bg: "bg-rose-50 border-rose-200", text: "text-rose-700", dot: "bg-rose-500" }
    };
    return configs[status.toLowerCase()] || { bg: "bg-slate-50 border-slate-200", text: "text-slate-700", dot: "bg-slate-500" };
  };

  const getFilterButtonClass = (status: string) => {
    const isActive = filter === status;
    const baseClass = "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ";
    if (isActive) {
      switch (status) {
        case "confirmé": return baseClass + "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200";
        case "en attente": return baseClass + "bg-amber-100 text-amber-700 ring-2 ring-amber-200";
        case "annulé": return baseClass + "bg-rose-100 text-rose-700 ring-2 ring-rose-200";
        default: return baseClass + "bg-slate-100 text-slate-700 ring-2 ring-slate-200";
      }
    }
    return baseClass + "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300";
  };

  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(a => a.status && a.status.toLowerCase() === "confirmé").length;
  const cancelledCount = appointments.filter(a => a.status && a.status.toLowerCase() === "annulé").length;
  const pendingCount = appointments.filter(a => a.status && a.status.toLowerCase() === "en attente").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-blue-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Chargement en cours</h3>
          <p className="text-slate-600">Récupération des rendez-vous médicaux...</p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header moderne */}
        <div className="mb-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            
            <div className="relative px-8 py-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Gestion des Rendez-vous</h1>
                    <p className="text-blue-100 text-lg">Interface administrateur pour la gestion des consultations médicales</p>
                  </div>
                </div>
                
                <div className="hidden lg:flex items-center space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-blue-100 text-sm font-medium">Aujourd'hui</p>
                    <p className="text-white text-lg font-bold">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-blue-100 text-sm font-medium">Statut</p>
                    <p className="text-white text-lg font-bold">Actif</p>
                  </div>
                </div>
              </div>
              
              {/* Statistiques rapides */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-6 h-6 text-blue-200" />
                    <span className="text-2xl font-bold text-white">{totalAppointments}</span>
                  </div>
                  <p className="text-blue-100 text-sm font-medium">Total</p>
                </div>
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-6 h-6 text-green-200" />
                    <span className="text-2xl font-bold text-white">{confirmedCount}</span>
                  </div>
                  <p className="text-green-100 text-sm font-medium">Confirmés</p>
                </div>
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-6 h-6 text-yellow-200" />
                    <span className="text-2xl font-bold text-white">{pendingCount}</span>
                  </div>
                  <p className="text-yellow-100 text-sm font-medium">En attente</p>
                </div>
                <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <XCircle className="w-6 h-6 text-red-200" />
                    <span className="text-2xl font-bold text-white">{cancelledCount}</span>
                  </div>
                  <p className="text-red-100 text-sm font-medium">Annulés</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerte d'erreur moderne */}
        {error && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg">Erreur détectée</h3>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-red-700 mb-4">{error}</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setError("")}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium"
                >
                  Fermer
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 font-medium flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panneau de recherche et filtres moderne */}
        <div className="mb-8 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recherche et Filtres</h3>
                  <p className="text-gray-600 text-sm">Filtrez et recherchez parmi {totalAppointments} rendez-vous</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>Mise à jour automatique</span>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
              
              {/* Barre de recherche améliorée */}
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Recherche globale</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par médecin, service, patient..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <XCircle className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filtres par statut */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Filtrer par statut</label>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {[ 
                    { key: "all", label: `Tous (${totalAppointments})`, icon: Users, color: "gray" },
                    { key: "confirmé", label: `Confirmés (${confirmedCount})`, icon: CheckCircle, color: "green" },
                    { key: "en attente", label: `En attente (${pendingCount})`, icon: Clock, color: "yellow" },
                    { key: "annulé", label: `Annulés (${cancelledCount})`, icon: XCircle, color: "red" }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = filter === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setFilter(item.key)}
                        className={`w-full p-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-between group ${
                          isActive 
                            ? `bg-${item.color}-100 text-${item.color}-700 ring-2 ring-${item.color}-200 shadow-lg` 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${
                            isActive ? `text-${item.color}-600` : 'text-gray-400 group-hover:text-gray-600'
                          }`} />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {isActive && (
                          <div className={`w-2 h-2 rounded-full bg-${item.color}-500`}></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Résultats de recherche */}
            {search && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Search className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {filteredAppointments.length} résultat(s) pour "{search}"
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucun rendez-vous trouvé</h3>
            <p className="text-gray-600 text-lg mb-8">
              {search || filter !== "all" 
                ? `Aucun résultat pour les critères sélectionnés` 
                : "Vous n'avez pas encore de rendez-vous programmés"}
            </p>
            {(search || filter !== "all") && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium inline-flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Tableau Desktop amélioré */}
            <div className="hidden lg:block bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* En-tête du tableau */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Liste des Rendez-vous</h3>
                      <p className="text-gray-600 text-sm">{filteredAppointments.length} rendez-vous affiché(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors duration-200 font-medium flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Nouveau</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-200 font-medium flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Actualiser</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Date & Heure</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Stethoscope className="w-4 h-4" />
                          <span>Médecin</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4" />
                          <span>Service</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Patient</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Contact</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>Info Patient</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4" />
                          <span>Statut</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Motif</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <ClipboardList className="w-4 h-4" />
                          <span>Diagnostic</span>
                        </div>
                      </th>
                      <th className="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appt, index) => {
                      const statusConfig = getStatusConfig(appt.status ? appt.status.toLowerCase() : '');
                      return (
                        <tr key={appt._id} className={`hover:bg-blue-50 transition-colors duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}>
                          {/* Date & Heure */}
                          <td className="px-6 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {new Date(appt.date).toLocaleDateString('fr-FR', { 
                                    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' 
                                  })}
                                </p>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{appt.time}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Médecin */}
                          <td className="px-6 py-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{appt.doctorName}</p>
                                <p className="text-xs text-gray-500">Médecin spécialiste</p>
                              </div>
                            </div>
                          </td>

                          {/* Service */}
                          <td className="px-6 py-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {appt.service}
                            </span>
                          </td>

                          {/* Patient */}
                          <td className="px-6 py-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-pink-600" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{appt.fullName}</p>
                                <p className="text-xs text-gray-500">Patient</p>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-6 py-6">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="truncate max-w-32">{appt.email}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{appt.phone}</span>
                              </div>
                            </div>
                          </td>

                          {/* Info Patient */}
                          <td className="px-6 py-6">
                            <div className="text-sm text-gray-600">
                              <p><span className="font-medium">Âge:</span> {appt.age} ans</p>
                              <p><span className="font-medium">Sexe:</span> {appt.gender}</p>
                            </div>
                          </td>

                          {/* Statut */}
                          <td className="px-6 py-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 ${statusConfig.bg} ${statusConfig.text}`}>
                              <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                              <span className="text-sm font-semibold">{appt.status}</span>
                            </div>
                          </td>

                          {/* Motif */}
                          <td className="px-6 py-6 max-w-48">
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                              <div className="flex items-center space-x-2 mb-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-semibold text-gray-600 uppercase">Motif</span>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-3">
                                {appt.notes || "Motif non renseigné"}
                              </p>
                            </div>
                          </td>

                          {/* Diagnostic */}
                          <td className="px-6 py-6 max-w-64">
                            {currentUser.role === "admin" ? (
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Stethoscope className="w-4 h-4 text-blue-600" />
                                  <span className="text-xs font-semibold text-blue-600 uppercase">Diagnostic Médical</span>
                                </div>
                                <textarea
                                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-sm min-h-[80px] max-h-32 resize-none focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                                  value={appt.diagnostic || ""}
                                  placeholder="Saisir le diagnostic médical..."
                                  onChange={(e) =>
                                    setAppointments((prev) =>
                                      prev.map((a) =>
                                        a._id === appt._id ? { ...a, diagnostic: e.target.value } : a
                                      )
                                    )
                                  }
                                  onBlur={async () => {
                                    try {
                                      setActionLoading(appt._id);
                                      const token = localStorage.getItem('token');
                                      await axios.patch(`http://localhost:5000/api/appointments/${appt._id}`, {
                                        diagnostic: appt.diagnostic,
                                      }, {
                                        headers: {
                                          Authorization: `Bearer ${token}`
                                        }
                                      });
                                      console.log("✅ Diagnostic sauvegardé avec succès");
                                    } catch (err: any) {
                                      console.error("❌ Erreur lors de l'enregistrement du diagnostic :", err);
                                      setError("Erreur lors de l'enregistrement du diagnostic.");
                                    } finally {
                                      setActionLoading("");
                                    }
                                  }}
                                />
                                {actionLoading === appt._id && (
                                  <div className="flex items-center gap-2 text-xs text-blue-600">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>Sauvegarde en cours...</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                                <div className="flex items-center space-x-2 mb-2">
                                  <ClipboardList className="w-4 h-4 text-blue-600" />
                                  <span className="text-xs font-semibold text-blue-600 uppercase">Diagnostic</span>
                                </div>
                                <p className="text-sm text-blue-700">
                                  {appt.diagnostic || "Diagnostic non disponible"}
                                </p>
                              </div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-6">
                            <div className="flex items-center justify-center space-x-2">
                              {actionLoading === appt._id ? (
                                <div className="w-8 h-8 flex items-center justify-center">
                                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                                </div>
                              ) : (
                                <>
                                  <button 
                                    onClick={() => updateStatus(appt._id, "confirmé")} 
                                    className="w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 rounded-xl transition-all duration-200 flex items-center justify-center group" 
                                    title="Confirmer"
                                  >
                                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                  </button>
                                  <button 
                                    onClick={() => updateStatus(appt._id, "annulé")} 
                                    className="w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-xl transition-all duration-200 flex items-center justify-center group" 
                                    title="Annuler"
                                  >
                                    <XCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                  </button>
                                  <button 
                                    onClick={() => deleteAppointment(appt._id)} 
                                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 rounded-xl transition-all duration-200 flex items-center justify-center group" 
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                  </button>
                                  <button 
                                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700 rounded-xl transition-all duration-200 flex items-center justify-center group" 
                                    title="Voir détails"
                                  >
                                    <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredAppointments.map((appt) => {
                const statusConfig = getStatusConfig(appt.status ? appt.status.toLowerCase() : '');
                return (
                  <div key={appt._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {new Date(appt.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {appt.time}
                          </p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                        <span className="text-sm font-medium">{appt.status}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-1"><strong>Médecin :</strong> {appt.doctorName}</p>
                    <p className="text-sm text-slate-600 mb-1"><strong>Service :</strong> {appt.service}</p>
                    <p className="text-sm text-slate-600 mb-1"><strong>Patient :</strong> {appt.fullName}</p>
                    <p className="text-sm text-slate-600 mb-1"><strong>Email :</strong> {appt.email}</p>
                    <p className="text-sm text-slate-600 mb-1"><strong>Téléphone :</strong> {appt.phone}</p>
                    <p className="text-sm text-slate-600 mb-2"><strong>Âge / Sexe :</strong> {appt.age} ans, {appt.gender}</p>

                    {/* Motif */}
                    <div className="mb-3 p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <p className="text-sm font-medium text-slate-700">Motif de consultation :</p>
                      </div>
                      <p className="text-sm text-slate-600 ml-6">{appt.notes || "Motif non renseigné"}</p>
                    </div>

                    {/* Diagnostic - Admin seulement */}
                    {currentUser.role === "admin" && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-medium text-slate-700">Diagnostic médical :</p>
                        </div>
                        <textarea
                          className="w-full p-3 border border-slate-200 rounded-lg text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={appt.diagnostic || ""}
                          placeholder="Saisir le diagnostic médical du patient..."
                          onChange={(e) =>
                            setAppointments((prev) =>
                              prev.map((a) =>
                                a._id === appt._id ? { ...a, diagnostic: e.target.value } : a
                              )
                            )
                          }
                          onBlur={async () => {
                            try {
                              setActionLoading(appt._id);
                              const token = localStorage.getItem('token');
                              await axios.patch(`http://localhost:5000/api/appointments/${appt._id}`, {
                                diagnostic: appt.diagnostic,
                              }, {
                                headers: {
                                  Authorization: `Bearer ${token}`
                                }
                              });
                              console.log("✅ Diagnostic sauvegardé avec succès");
                            } catch (err: any) {
                              console.error("❌ Erreur lors de l'enregistrement du diagnostic :", err);
                              setError("Erreur lors de l'enregistrement du diagnostic.");
                            } finally {
                              setActionLoading("");
                            }
                          }}
                        />
                        {actionLoading === appt._id && (
                          <div className="flex items-center gap-2 text-xs text-blue-600 mt-2">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Sauvegarde du diagnostic en cours...
                          </div>
                        )}
                      </div>
                    )}

                    {/* Affichage du diagnostic pour les non-admin */}
                    {currentUser.role !== "admin" && appt.diagnostic && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <ClipboardList className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-medium text-blue-700">Diagnostic :</p>
                        </div>
                        <p className="text-sm text-blue-600 ml-6">{appt.diagnostic}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2">
                      {actionLoading === appt._id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                      ) : (
                        <>
                          <button onClick={() => updateStatus(appt._id, "confirmé")} className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-150" title="Confirmer">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => updateStatus(appt._id, "annulé")} className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-150" title="Annuler">
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => deleteAppointment(appt._id)} className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-150" title="Supprimer">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div> 
    </div>
  );
};

export default AppointmentList;
