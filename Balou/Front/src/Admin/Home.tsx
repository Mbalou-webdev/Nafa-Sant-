import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BsFillGrid3X3GapFill, 
  BsPeopleFill, 
  BsFillCalendarFill,
  BsFillCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
  BsGraphUp,
  BsEyeFill
} from "react-icons/bs";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import Appointments from '../component/appointments/Appointments';
  
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Appointment {
  _id: string;
  fullName: string;
  service: string;
  status: string;
  date: string;
  createdAt: string;
}

interface DashboardStats {
  totalUsers: number;
  totalAppointments: number;
  confirmedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
  todayAppointments: number;
  monthlyGrowth: number;
  recentUsers: User[];
  recentAppointments: Appointment[];
  servicesStats: { name: string; count: number; color: string }[];
  monthlyData: { month: string; appointments: number; users: number }[];
}

function Home() {
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAppointments: 0,
    confirmedAppointments: 0,
    pendingAppointments: 0,
    cancelledAppointments: 0,
    todayAppointments: 0,
    monthlyGrowth: 0,
    recentUsers: [],
    recentAppointments: [],
    servicesStats: [],
    monthlyData: []
  });
  const [loading, setLoading] = useState(true);

  // Couleurs pour les graphiques
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Charger les données réelles
  useEffect(() => {
    console.log('🚀 Démarrage du chargement des données...');
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('❌ Token manquant - utilisateur non connecté');
          setLoading(false);
          return;
        }
        
        console.log('🔑 Token trouvé:', token.substring(0, 20) + '...');
        
        const headers = { Authorization: `Bearer ${token}` };
        const API_BASE_URL = 'http://localhost:5000';

        console.log('📡 Appel API pour récupérer les données...');
        
        // Récupérer les utilisateurs et rendez-vous
        const usersRes = await axios.get(`${API_BASE_URL}/api/users`, { headers });
        const appointmentsRes = await axios.get(`${API_BASE_URL}/api/appointments`, { headers });
        
        const users: User[] = usersRes.data || [];
        const appointments: Appointment[] = appointmentsRes.data || [];

        console.log('📊 Données récupérées:');
        console.log('👥 Utilisateurs:', users.length, users);
        console.log('📅 Rendez-vous:', appointments.length, appointments);
        
        if (appointments.length > 0) {
          console.log('📅 Premier rendez-vous:', appointments[0]);
          console.log('📅 Statuts des rendez-vous:', appointments.map(apt => apt.status));
        }

        // Calculer les statistiques
        const totalUsers = users?.length || 0;
        const totalAppointments = appointments?.length || 0;
        
        // Statistiques par statut - vérification de tous les statuts possibles
        const confirmedAppointments = appointments?.filter(apt => {
          const status = apt.status?.toLowerCase()?.trim();
          return status === 'confirmed' || status === 'confirmé' || status === 'confirmer' || status === 'confirmé';
        }).length || 0;
        
        const pendingAppointments = appointments?.filter(apt => {
          const status = apt.status?.toLowerCase()?.trim();
          return status === 'pending' || status === 'en attente' || status === 'attente' || status === 'en_attente';
        }).length || 0;
        
        const cancelledAppointments = appointments?.filter(apt => {
          const status = apt.status?.toLowerCase()?.trim();
          return status === 'cancelled' || status === 'annulé' || status === 'annule' || status === 'canceled' || status === 'annulé';
        }).length || 0;

        // Rendez-vous d'aujourd'hui
        const today = new Date().toISOString().split('T')[0];
        const todayAppointments = appointments?.filter(apt => {
          if (!apt.date) return false;
          try {
            return new Date(apt.date).toISOString().split('T')[0] === today;
          } catch {
            return false;
          }
        }).length || 0;

        // Calcul de la croissance mensuelle
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const usersLastMonth = users?.filter(user => {
          if (!user.createdAt) return false;
          try {
            return new Date(user.createdAt) >= lastMonth;
          } catch {
            return false;
          }
        }).length || 0;
        const monthlyGrowth = totalUsers > 0 ? (usersLastMonth / totalUsers) * 100 : 0;

        // Utilisateurs récents (derniers 5)
        const recentUsers = users?.length > 0 ? users
          .sort((a, b) => {
            try {
              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } catch {
              return 0;
            }
          })
          .slice(0, 5) : [];

        // Rendez-vous récents (derniers 5)
        const recentAppointments = appointments?.length > 0 ? appointments
          .sort((a, b) => {
            try {
              return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            } catch {
              return 0;
            }
          })
          .slice(0, 5) : [];

        // Statistiques par service
        const serviceCount: { [key: string]: number } = {};
        appointments?.forEach(apt => {
          if (apt.service) {
            serviceCount[apt.service] = (serviceCount[apt.service] || 0) + 1;
          }
        });

        const servicesStats = Object.entries(serviceCount)
          .map(([name, count], index) => ({
            name,
            count,
            color: COLORS[index % COLORS.length]
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        // Données mensuelles pour les graphiques
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          const monthYear = date.toISOString().slice(0, 7);
          
          const monthAppointments = appointments?.filter(apt => {
            try {
              return apt.createdAt?.slice(0, 7) === monthYear;
            } catch {
              return false;
            }
          }).length || 0;
          
          const monthUsers = users?.filter(user => {
            try {
              return user.createdAt?.slice(0, 7) === monthYear;
            } catch {
              return false;
            }
          }).length || 0;

          monthlyData.push({
            month: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
            appointments: monthAppointments,
            users: monthUsers
          });
        }

        setStats({
          totalUsers,
          totalAppointments,
          confirmedAppointments,
          pendingAppointments,
          cancelledAppointments,
          todayAppointments,
          monthlyGrowth,
          recentUsers,
          recentAppointments,
          servicesStats,
          monthlyData
        });

        console.log('📊 Statistiques calculées:');
        console.log('Total utilisateurs:', totalUsers);
        console.log('Total rendez-vous:', totalAppointments);
        console.log('Confirmés:', confirmedAppointments);
        console.log('En attente:', pendingAppointments);
        console.log('Annulés:', cancelledAppointments);
        console.log('Aujourd\'hui:', todayAppointments);
        console.log('📋 Détail des statuts trouvés:', appointments?.map(apt => `${apt.fullName}: "${apt.status}"`));

      } catch (error: any) {
        console.error('❌ Erreur lors du chargement des données:', error);
        if (error.response) {
          console.error('📊 Réponse d\'erreur:', error.response.status, error.response.data);
          if (error.response.status === 401) {
            console.error('🔒 Problème d\'authentification - token invalide ou expiré');
          }
        } else if (error.request) {
          console.error('🌐 Pas de réponse du serveur - vérifiez que le backend fonctionne sur le port 5000');
        } else {
          console.error('⚙️ Erreur de configuration:', error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <main className="main-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 2s linear infinite'
          }}></div>
        </div>
      </main>
    );
  }

  return(
    <main className="main-container">
      <div className="main-title">
        <h3>Tableau de Bord</h3>
        <div className="tab-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>  
          <button 
            onClick={() => setActiveView('dashboard')}
            className={activeView === 'dashboard' ? 'active-tab' : 'tab-btn'}
            style={{
              padding: '8px 16px',
              backgroundColor: activeView === 'dashboard' ? '#007bff' : '#f8f9fa',
              color: activeView === 'dashboard' ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveView('appointments')}
            className={activeView === 'appointments' ? 'active-tab' : 'tab-btn'}
            style={{
              padding: '8px 16px',
              backgroundColor: activeView === 'appointments' ? '#007bff' : '#f8f9fa',
              color: activeView === 'appointments' ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Rendez-vous
          </button>
        </div>
      </div>

      {activeView === 'appointments' ? (
        <Appointments />
      ) : (
        <>
          {/* Cartes de statistiques principales */}
          <div className="main-cards" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {/* Total Utilisateurs */}
            <div className="card" style={{ backgroundColor: '#667eea' }}>
              <div className="card-inner">
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Utilisateurs</h3>
                  <h1 style={{ margin: '5px 0', fontSize: '28px' }}>{stats.totalUsers || 0}</h1>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>+{(stats.monthlyGrowth || 0).toFixed(1)}% ce mois</p>
                </div>
                <BsPeopleFill className="card-icon" />
              </div>
            </div>

            {/* Total Rendez-vous */}
            <div className="card" style={{ backgroundColor: '#f093fb' }}>
              <div className="card-inner">
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Rendez-vous</h3>
                  <h1 style={{ margin: '5px 0', fontSize: '28px' }}>{stats.totalAppointments || 0}</h1>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{stats.todayAppointments || 0} aujourd'hui</p>
                </div>
                <BsFillCalendarFill className="card-icon" />
              </div>
            </div>

            {/* Confirmés */}
            <div className="card" style={{ backgroundColor: '#4facfe' }}>
              <div className="card-inner">
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Confirmés</h3>
                  <h1 style={{ margin: '5px 0', fontSize: '28px' }}>{stats.confirmedAppointments || 0}</h1>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                    {stats.totalAppointments > 0 ? ((stats.confirmedAppointments / stats.totalAppointments) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <BsFillCheckCircleFill className="card-icon" />
              </div>
            </div>

            {/* En Attente */}
            <div className="card" style={{ backgroundColor: '#fa709a' }}>
              <div className="card-inner">
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>En Attente</h3>
                  <h1 style={{ margin: '5px 0', fontSize: '28px' }}>{stats.pendingAppointments || 0}</h1>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>À traiter</p>
                </div>
                <BsClockFill className="card-icon" />
              </div>
            </div>

            {/* Annulés */}
            <div className="card" style={{ backgroundColor: '#e74c3c' }}>
              <div className="card-inner">
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Annulés</h3>
                  <h1 style={{ margin: '5px 0', fontSize: '28px' }}>{stats.cancelledAppointments || 0}</h1>
                  <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Annulés</p>
                </div>
                <BsXCircleFill className="card-icon" />
              </div>
            </div>
          </div>

          {/* Graphiques */}
          <div className="charts">
            {/* Graphique des tendances mensuelles */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Tendances Mensuelles
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={stats.monthlyData}>
                  <defs>
                    <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorAppointments)"
                    name="Rendez-vous"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#82ca9d" 
                    fillOpacity={1} 
                    fill="url(#colorUsers)"
                    name="Utilisateurs"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Graphique des services populaires */}
            {stats.servicesStats.length > 0 && (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                  Services Populaires
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.servicesStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.servicesStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Section d'activité récente */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '20px',
            marginTop: '30px'
          }}>
            {/* Utilisateurs récents */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Nouveaux Utilisateurs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stats.recentUsers.slice(0, 5).map((user) => (
                  <div key={user._id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, color: '#374151' }}>
                        {user.firstName} {user.lastName}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                        {user.email}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: user.role === 'admin' ? '#e3f2fd' : '#e8f5e8',
                      color: user.role === 'admin' ? '#1976d2' : '#2e7d32',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}>
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rendez-vous récents */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#374151' }}>
                Rendez-vous Récents
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {stats.recentAppointments.slice(0, 5).map((appointment) => (
                  <div key={appointment._id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: 0, color: '#374151' }}>
                        {appointment.fullName}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6c757d', margin: 0 }}>
                        {appointment.service}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: 
                        appointment.status === 'confirmed' || appointment.status === 'confirmé' ? '#e8f5e8' :
                        appointment.status === 'pending' || appointment.status === 'en attente' ? '#fff3cd' : '#f8d7da',
                      color: 
                        appointment.status === 'confirmed' || appointment.status === 'confirmé' ? '#2e7d32' :
                        appointment.status === 'pending' || appointment.status === 'en attente' ? '#856404' : '#721c24',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Home