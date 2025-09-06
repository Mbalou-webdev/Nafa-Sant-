import React from 'react';
import { Phone, Mail, MapPin, Clock, Shield, Heart, Stethoscope, Star, Award, Activity, ArrowRight, CheckCircle, Calendar } from 'lucide-react';

const Contact: React.FC = () => {
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
        
        {/* Contact Illustration Background */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full text-white">
            <defs>
              <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Phone and communication icons */}
            <rect x="150" y="100" width="100" height="160" rx="20" fill="url(#contactGradient)" />
            <circle cx="200" cy="130" r="8" fill="url(#contactGradient)" />
            <rect x="170" y="240" width="60" height="8" rx="4" fill="url(#contactGradient)" />
            {/* Email envelope */}
            <rect x="80" y="200" width="120" height="80" rx="10" fill="url(#contactGradient)" />
            <path d="M80 220 L140 250 L200 220" stroke="url(#contactGradient)" strokeWidth="6" fill="none" />
            {/* Location pin */}
            <circle cx="320" cy="180" r="25" fill="url(#contactGradient)" />
            <circle cx="320" cy="170" r="12" fill="url(#contactGradient)" />
            <path d="M320 205 L320 240" stroke="url(#contactGradient)" strokeWidth="8" />
            {/* Communication waves */}
            <circle cx="60" cy="120" r="15" fill="none" stroke="url(#contactGradient)" strokeWidth="4" opacity="0.6" />
            <circle cx="60" cy="120" r="25" fill="none" stroke="url(#contactGradient)" strokeWidth="3" opacity="0.4" />
            <circle cx="60" cy="120" r="35" fill="none" stroke="url(#contactGradient)" strokeWidth="2" opacity="0.2" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
            <Phone className="w-5 h-5" />
            <span>Contact & Support</span>
            <Star className="w-4 h-4 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="drop-shadow-lg">
              Nous Contacter
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              24h/24
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans vos démarches de santé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-green-300/50 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <button className="relative bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex items-center gap-3">
                <Calendar className="h-5 w-5" />
                Prendre Rendez-vous
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <a 
              href="tel:+224613162589"
              className="group flex items-center justify-center gap-3 border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-xl"
            >
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Appeler Maintenant
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Cards */}
      <section className="py-24 relative">
        {/* Medical Background Pattern */}
        <div className="absolute top-20 left-20 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
            <defs>
              <linearGradient id="contactBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect x="80" y="60" width="20" height="80" rx="10" fill="url(#contactBgGradient)" />
            <rect x="60" y="80" width="80" height="20" rx="10" fill="url(#contactBgGradient)" />
            <circle cx="50" cy="50" r="15" fill="url(#contactBgGradient)" />
            <circle cx="150" cy="150" r="12" fill="url(#contactBgGradient)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Activity className="w-5 h-5" />
              <span className="font-bold">Moyens de Contact</span>
              <Award className="w-4 h-4 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Plusieurs Façons</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">de Nous Joindre</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choisissez le moyen de communication qui vous convient le mieux pour entrer en contact avec notre équipe médicale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Enhanced Phone Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-blue-200">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                  <circle cx="50" cy="50" r="20" fill="currentColor" />
                  <rect x="40" y="20" width="4" height="15" rx="2" fill="currentColor" />
                  <rect x="35" y="30" width="14" height="4" rx="2" fill="currentColor" />
                </svg>
              </div>
              
              <div className="relative z-10 p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Téléphone</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Appelez-nous pour prendre rendez-vous ou pour toute question urgente</p>
                <a 
                  href="tel:+224613162589"
                  className="inline-block text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-4"
                >
                  +224 613 16 25 89
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Lun-Ven: 8h-18h</span>
                </div>
              </div>
            </div>

            {/* Enhanced Email Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-green-200">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
                  <rect x="20" y="35" width="60" height="40" rx="5" fill="currentColor" />
                  <path d="M20 45 L50 60 L80 45" stroke="white" strokeWidth="3" fill="none" />
                </svg>
              </div>
              
              <div className="relative z-10 p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">Email</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Envoyez-nous un message détaillé, nous vous répondrons rapidement</p>
                <a 
                  href="mailto:info@nafasante.com"
                  className="inline-block text-xl font-bold text-green-600 hover:text-green-700 transition-colors mb-4"
                >
                  info@nafasante.com
                </a>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4" />
                  <span>Réponse sous 24h</span>
                </div>
              </div>
            </div>

            {/* Enhanced Address Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-purple-200">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
                  <circle cx="50" cy="40" r="20" fill="currentColor" />
                  <circle cx="50" cy="35" r="8" fill="white" />
                  <path d="M50 60 L50 80" stroke="currentColor" strokeWidth="6" />
                </svg>
              </div>
              
              <div className="relative z-10 p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Adresse</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Venez nous rendre visite dans notre clinique moderne</p>
                <p className="text-xl font-bold text-purple-600 mb-4">Pita, Mamou, Guinée</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Accès facile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Emergency Section */}
          <div className="relative overflow-hidden rounded-3xl">
            {/* Premium Emergency Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 rounded-3xl"></div>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/10 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
              <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
            </div>
            
            {/* Emergency Medical Illustration */}
            <div className="absolute top-5 right-5 w-40 h-40 opacity-10">
              <svg viewBox="0 0 150 150" className="w-full h-full text-white">
                <defs>
                  <linearGradient id="emergencyContactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Emergency cross */}
                <rect x="65" y="40" width="20" height="70" rx="10" fill="url(#emergencyContactGradient)" />
                <rect x="40" y="65" width="70" height="20" rx="10" fill="url(#emergencyContactGradient)" />
                {/* Heart pulse */}
                <path d="M30 30 Q35 25 40 30 Q45 35 50 30 Q55 25 60 30" stroke="url(#emergencyContactGradient)" strokeWidth="3" fill="none" opacity="0.8" />
                <circle cx="25" cy="35" r="3" fill="url(#emergencyContactGradient)" opacity="0.6" />
              </svg>
            </div>
            
            <div className="relative px-8 py-12 text-center text-white z-10">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-xl">
                <Heart className="w-4 h-4 animate-pulse" />
                <span>Urgences Médicales</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <span className="drop-shadow-lg">Urgences</span>
                <br />
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">24h/24</span>
              </h3>
              
              <p className="text-lg mb-8 opacity-90 leading-relaxed max-w-md mx-auto">
                En cas d'urgence médicale, notre équipe d'urgentistes est disponible en permanence.
              </p>
              
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/30 to-blue-300/30 rounded-2xl blur opacity-60"></div>
                <a 
                  href="tel:+224621369662"
                  className="relative block bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white p-6 rounded-2xl shadow-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <p className="text-4xl md:text-5xl font-bold mb-2 text-blue-200">+224 621 36 96 62</p>
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Clock className="h-5 w-5" />
                    <span>Disponible 24h/24</span>
                  </div>
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/20">
                  <Shield className="h-4 w-4 text-blue-200" />
                  <span>Intervention rapide</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/20">
                  <Stethoscope className="h-4 w-4 text-blue-200" />
                  <span>Équipe qualifiée</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/20">
                  <Activity className="h-4 w-4 text-blue-200" />
                  <span>Soins d'urgence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
