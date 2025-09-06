import React, { useEffect, useState } from 'react';
import { Button } from '../component/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, Baby, User, Eye, Bone, Activity, Clock, CheckCircle, Star, Phone, Calendar, Shield, Award, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAppointment = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous inscrire ou vous connecter pour prendre un rendez-vous.");
      navigate('/login');
    } else {
      navigate('/appointment');
    }
  };

  const services = [
    {
      icon: Stethoscope,
      name: 'Consultation générale',
      description: 'Consultation médicale générale pour tous vos besoins de santé',
      price: '25,000 GNF',
      duration: '30 min',
      features: ['Examen clinique complet', 'Conseils médicaux', 'Prescription si nécessaire']
    },
    {
      icon: Baby,
      name: 'Pédiatrie',
      description: 'Soins spécialisés pour les enfants de 0 à 18 ans',
      price: '30,000 GNF',
      duration: '45 min',
      features: ['Suivi de croissance', 'Vaccinations', 'Conseils parentaux']
    },
    {
      icon: Heart,
      name: 'Cardiologie',
      description: 'Diagnostic et traitement des maladies cardiovasculaires',
      price: '50,000 GNF',
      duration: '60 min',
      features: ['ECG', 'Échographie cardiaque', 'Suivi tension artérielle']
    },
    {
      icon: Eye,
      name: 'Dermatologie',
      description: 'Traitement des affections de la peau, des cheveux et des ongles',
      price: '35,000 GNF',
      duration: '30 min',
      features: ['Examen dermatologique', 'Biopsie cutanée', 'Traitement laser']
    },
    {
      icon: User,
      name: 'Gynécologie',
      description: 'Soins de santé reproductive et gynécologique pour les femmes',
      price: '40,000 GNF',
      duration: '45 min',
      features: ['Examen gynécologique', 'Échographie pelvienne', 'Dépistage']
    },
    {
      icon: Bone,
      name: 'Orthopédie',
      description: 'Traitement des troubles musculosquelettiques',
      price: '45,000 GNF',
      duration: '45 min',
      features: ['Radiographie', 'Traitement des fractures', 'Rééducation']
    }
  ];

  const emergencyServices = [
    'Urgences 24h/24',
    'Soins d\'urgence',
    'Ambulance',
    'Hospitalisation'
  ];

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Enhanced animated background pattern */}
      <div className="fixed inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, #3b82f6 2px, transparent 0), 
            radial-gradient(circle at 75px 75px, #8b5cf6 1px, transparent 0),
            linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.02) 50%, transparent 60%)
          `,
          backgroundSize: '100px 100px, 50px 50px, 200px 200px',
          animation: 'backgroundShift 20s ease-in-out infinite'
        }}></div>
      </div>
      
      {/* Global CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes backgroundShift {
            0%, 100% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(10px) translateY(-10px); }
          }
          @keyframes floatUp {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.9; }
          }
        `
      }} />
      {/* Enhanced Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 border-2 border-white/20 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 border border-white/10 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
          <div className="absolute top-1/2 left-10 w-40 h-40 bg-white/5 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
        </div>
        
        {/* Medical Illustration Background */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full text-white">
            <defs>
              <linearGradient id="servicesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Medical equipment icons */}
            <rect x="180" y="120" width="40" height="160" rx="20" fill="url(#servicesGradient)" />
            <rect x="120" y="180" width="160" height="40" rx="20" fill="url(#servicesGradient)" />
            <circle cx="100" cy="100" r="25" fill="url(#servicesGradient)" />
            <path d="M100 125 Q150 140 200 180 Q220 200 200 220 Q180 230 170 220 Q160 210 170 200 Q180 190 170 170 Q150 155 100 125" stroke="url(#servicesGradient)" strokeWidth="8" fill="none" />
            <circle cx="300" cy="300" r="20" fill="url(#servicesGradient)" />
            <path d="M280 280 L320 280 M300 260 L300 320" stroke="url(#servicesGradient)" strokeWidth="6" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
            <Stethoscope className="w-5 h-5" />
            <span>Services Médicaux Premium</span>
            <Star className="w-4 h-4 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="drop-shadow-lg">
              Excellence Médicale
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              à Votre Service
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Découvrez notre gamme complète de services médicaux spécialisés, conçus pour répondre à tous vos besoins de santé avec la plus haute qualité de soins.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-blue-300/50 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Button
                onClick={handleAppointment}
                className="relative bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Réserver Consultation
              </Button>
            </div>
            <button className="group flex items-center justify-center gap-3 border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-xl">
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Nous Contacter
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="py-24 relative">
        {/* Medical Background Pattern */}
        <div className="absolute top-20 left-20 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
            <defs>
              <linearGradient id="servicesBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect x="80" y="60" width="20" height="80" rx="10" fill="url(#servicesBgGradient)" />
            <rect x="60" y="80" width="80" height="20" rx="10" fill="url(#servicesBgGradient)" />
            <circle cx="50" cy="50" r="15" fill="url(#servicesBgGradient)" />
            <circle cx="150" cy="150" r="12" fill="url(#servicesBgGradient)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Activity className="w-5 h-5" />
              <span className="font-bold">Expertise Médicale</span>
              <Star className="w-4 h-4 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Nos Services</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">Spécialisés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une gamme complète de services médicaux conçus pour répondre à tous vos besoins de santé avec excellence et compassion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-blue-200">
                {/* Enhanced Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                    <circle cx="20" cy="20" r="8" fill="currentColor" />
                    <circle cx="80" cy="80" r="6" fill="currentColor" />
                    <rect x="40" y="10" width="4" height="20" rx="2" fill="currentColor" />
                    <rect x="30" y="20" width="20" height="4" rx="2" fill="currentColor" />
                  </svg>
                </div>
                
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl mr-6 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-blue-600">{service.price}</span>
                      <p className="text-sm text-gray-500 font-medium">Tarif consultation</p>
                    </div>
                    <div className="text-center flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <span className="text-lg font-bold text-purple-600">{service.duration}</span>
                        <p className="text-sm text-gray-500">Durée moyenne</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                    <button 
                      onClick={handleAppointment}
                      className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                      <Calendar className="h-5 w-5" />
                      Réserver Consultation
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Emergency Services */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Premium Background - Contained */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 rounded-3xl"></div>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white/20 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
              <div className="absolute top-1/2 right-20 w-32 h-32 bg-white/10 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
            </div>
            
            {/* Emergency Medical Illustration */}
            <div className="absolute top-10 right-10 w-80 h-80 opacity-10">
              <svg viewBox="0 0 300 300" className="w-full h-full text-white">
                <defs>
                  <linearGradient id="emergencyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Ambulance shape */}
                <rect x="50" y="150" width="200" height="80" rx="20" fill="url(#emergencyGradient)" />
                <rect x="200" y="120" width="80" height="50" rx="15" fill="url(#emergencyGradient)" />
                <circle cx="100" cy="240" r="25" fill="url(#emergencyGradient)" />
                <circle cx="220" cy="240" r="25" fill="url(#emergencyGradient)" />
                {/* Medical cross */}
                <rect x="140" y="160" width="20" height="60" rx="10" fill="url(#emergencyGradient)" />
                <rect x="120" y="180" width="60" height="20" rx="10" fill="url(#emergencyGradient)" />
                {/* Emergency signals */}
                <circle cx="80" cy="80" r="8" fill="url(#emergencyGradient)" opacity="0.8" />
                <circle cx="120" cy="60" r="6" fill="url(#emergencyGradient)" opacity="0.6" />
                <circle cx="160" cy="50" r="10" fill="url(#emergencyGradient)" opacity="0.9" />
              </svg>
            </div>
            
            <div className="relative px-8 py-16 sm:px-16 text-white z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
              <Heart className="w-5 h-5 animate-pulse" />
              <span>Services d'Urgence</span>
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="drop-shadow-lg">Urgences Médicales</span>
              <br />
              <span className="bg-gradient-to-r from-white via-red-100 to-pink-100 bg-clip-text text-transparent">24h/24 - 7j/7</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
              Notre équipe d'urgentistes expérimentés est disponible en permanence pour vous offrir des soins d'urgence de la plus haute qualité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {emergencyServices.map((service, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/30 to-red-300/30 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">{service}</h3>
                <p className="text-white/80 group-hover:text-white transition-colors">Service disponible immédiatement</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-white/30 to-blue-300/30 rounded-3xl blur opacity-60"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Phone className="h-8 w-8 animate-bounce" />
                  Numéro d'Urgence
                </h3>
                <p className="text-4xl md:text-5xl font-bold mb-2 text-blue-200">+224 621 36 96 62</p>
                <p className="text-lg opacity-90">Ligne d'urgence disponible 24h/24</p>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Premium Background - Contained */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-3xl"></div>
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-72 h-72 border-2 border-white/20 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
              <div className="absolute bottom-20 right-20 w-56 h-56 border border-white/10 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
              <div className="absolute top-1/2 left-10 w-40 h-40 bg-white/5 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
            </div>
            
            {/* Medical consultation illustration */}
            <div className="absolute bottom-10 left-10 w-64 h-64 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white">
                <defs>
                  <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Doctor and patient consultation */}
                <circle cx="60" cy="40" r="20" fill="url(#ctaGradient)" />
                <rect x="50" y="60" width="20" height="40" rx="10" fill="url(#ctaGradient)" />
                <circle cx="140" cy="40" r="18" fill="url(#ctaGradient)" />
                <rect x="132" y="58" width="16" height="35" rx="8" fill="url(#ctaGradient)" />
                {/* Consultation table */}
                <rect x="80" y="100" width="40" height="20" rx="5" fill="url(#ctaGradient)" />
                {/* Medical equipment */}
                <circle cx="100" cy="140" r="8" fill="url(#ctaGradient)" />
                <path d="M100 148 Q110 155 120 165" stroke="url(#ctaGradient)" strokeWidth="4" fill="none" />
                {/* Communication lines */}
                <path d="M70 50 Q90 60 110 50" stroke="url(#ctaGradient)" strokeWidth="3" fill="none" opacity="0.7" />
              </svg>
            </div>
            
            <div className="relative px-8 py-16 sm:px-16 text-center text-white z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
            <Shield className="w-5 h-5" />
            <span>Support Médical Premium</span>
            <Award className="w-4 h-4 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="drop-shadow-lg">Besoin de Plus</span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">d'Informations ?</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Notre équipe médicale experte est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre parcours de santé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-green-300/50 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <button
                onClick={handleAppointment}
                className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3"
              >
                <Calendar className="h-6 w-6" />
                Prendre Rendez-vous
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <button 
              onClick={() => navigate('/contact')}
              className="group flex items-center justify-center gap-3 border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-xl"
            >
              <Phone className="h-6 w-6 group-hover:scale-110 transition-transform" />
              Nous Contacter
            </button>
          </div>
          
          {/* Enhanced Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-sm">
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
              <CheckCircle className="h-6 w-6 text-green-300 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Réponse sous 2h</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
              <Shield className="h-6 w-6 text-blue-300 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Consultations sécurisées</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors group">
              <Star className="h-6 w-6 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">Satisfaction garantie</span>
            </div>
          </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
