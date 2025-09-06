import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, Clock, Shield, Star, Users, MapPin, Phone, Mail, CheckCircle, ArrowRight, Play, Award, Activity, Stethoscope, HeartHandshake, Brain } from 'lucide-react';

const ReserveButton = ({ className = "" }: { className?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleReservation = () => {
    if (isAuthenticated) {
      navigate('/appointment');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleReservation}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 ${className}`}
    >
      {isAuthenticated ? 'Réserver Consultation' : 'Se Connecter'}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const services = [
    { icon: Users, title: "Médecine Générale", description: "Consultations médicales complètes pour toute la famille." },
    { icon: Calendar, title: "Rendez-vous en Ligne", description: "Prenez rendez-vous facilement via notre plateforme." },
    { icon: Clock, title: "Consultations Rapides", description: "Service médical efficace sans temps d'attente." },
    { icon: Shield, title: "Soins Sécurisés", description: "Protocoles de sécurité et d'hygiène stricts." }
  ];

  const stats = [
    { number: '2.5K+', label: 'Patients Traités', icon: Users },
    { number: '24/7', label: 'Support Médical', icon: Clock },
    { number: '98%', label: 'Taux de Satisfaction', icon: Star },
    { number: '15+', label: 'Spécialistes Certifiés', icon: Shield },
  ];

  const testimonials = [
    { name: 'Marie Dubois', comment: 'Excellent service ! L\'équipe médicale est très professionnelle et à l\'écoute.', rating: 5 },
    { name: 'Jean Martin', comment: 'Prise de rendez-vous très simple et consultation de qualité. Je recommande !', rating: 5 },
    { name: 'Sophie Laurent', comment: 'Service rapide et efficace, médecins compétents. Très satisfaite de mon expérience.', rating: 5 },
  ];

  const features = [
    { title: 'Équipe Qualifiée', description: 'Médecins expérimentés et personnel soignant dévoué.', icon: Star },
    { title: 'Équipements Modernes', description: 'Matériel médical de dernière génération.', icon: CheckCircle },
    { title: 'Suivi Patient', description: 'Accompagnement personnalisé et suivi médical.', icon: Users },
    { title: 'Service de Qualité', description: 'Excellence dans les soins et la prise en charge.', icon: Award }
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Geometric Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 border-2 border-blue-100 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 border border-purple-100 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
          <div className="absolute top-1/2 left-10 w-40 h-40 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-full" style={{animation: 'floatUp 6s ease-in-out infinite'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <Activity className="w-5 h-5" />
                <span className="font-bold">Centre Médical Nafa Santé</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
            
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="text-gray-900 drop-shadow-sm">
                  Votre Santé,
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                  Notre Mission
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed font-light">
                Découvrez une nouvelle dimension des soins médicaux avec notre équipe d'experts dédiée à votre bien-être et votre santé optimale.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <ReserveButton className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300" />
                </div>
                <button className="group flex items-center justify-center gap-3 border-2 border-gray-300 hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-gray-700 hover:text-blue-600 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg transform hover:-translate-y-1">
                  <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  Découvrir nos services
                </button>
              </div>

              {/* Enhanced Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3 bg-green-50 px-4 py-3 rounded-xl border border-green-200 hover:bg-green-100 transition-colors group">
                  <CheckCircle className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-green-700">Certifié ISO 9001</span>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 px-4 py-3 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors group">
                  <Shield className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-blue-700">Données sécurisées</span>
                </div>
                <div className="flex items-center gap-3 bg-yellow-50 px-4 py-3 rounded-xl border border-yellow-200 hover:bg-yellow-100 transition-colors group">
                  <Star className="h-6 w-6 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-yellow-700">4.9/5 satisfaction</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main hero illustration */}
              <div className="absolute -top-16 -right-16 w-96 h-96 opacity-10">
                <svg viewBox="0 0 400 400" className="w-full h-full text-blue-500">
                  <defs>
                    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {/* Medical cross */}
                  <rect x="180" y="120" width="40" height="160" rx="20" fill="url(#heroGradient)" />
                  <rect x="120" y="180" width="160" height="40" rx="20" fill="url(#heroGradient)" />
                  
                  {/* Stethoscope */}
                  <circle cx="150" cy="100" r="15" fill="url(#heroGradient)" />
                  <path d="M150 115 Q180 130 200 160 Q210 180 200 200 Q190 210 180 200 Q170 190 180 180 Q190 170 180 150 Q160 135 150 115" stroke="url(#heroGradient)" strokeWidth="8" fill="none" />
                  
                  {/* Heart */}
                  <path d="M280 150 C270 140 250 140 250 160 C250 140 230 140 220 150 C210 160 220 180 250 200 C280 180 290 160 280 150 Z" fill="url(#heroGradient)" />
                  
                  {/* Medical molecules */}
                  <circle cx="100" cy="300" r="8" fill="url(#heroGradient)" />
                  <circle cx="130" cy="320" r="6" fill="url(#heroGradient)" />
                  <circle cx="160" cy="310" r="7" fill="url(#heroGradient)" />
                  <line x1="100" y1="300" x2="130" y2="320" stroke="url(#heroGradient)" strokeWidth="3" />
                  <line x1="130" y1="320" x2="160" y2="310" stroke="url(#heroGradient)" strokeWidth="3" />
                  
                  {/* DNA helix */}
                  <path d="M320 120 Q340 140 320 160 Q300 180 320 200 Q340 220 320 240" stroke="url(#heroGradient)" strokeWidth="6" fill="none" />
                  <path d="M320 120 Q300 140 320 160 Q340 180 320 200 Q300 220 320 240" stroke="url(#heroGradient)" strokeWidth="4" fill="none" opacity="0.7" />
                </svg>
              </div>
              
              <div className="relative z-10">
                {/* Enhanced Main card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-3xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-3xl mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                      <Stethoscope className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Consultation Premium</h3>
                    <p className="text-gray-600 text-lg">Rendez-vous en ligne disponible 24/7</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                      <span className="text-sm font-bold text-gray-700">Prochaine disponibilité</span>
                      <span className="text-sm font-bold text-blue-600 bg-white px-3 py-1 rounded-full">Aujourd'hui 14h30</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                      <span className="text-sm font-bold text-gray-700">Durée consultation</span>
                      <span className="text-sm font-bold text-purple-600 bg-white px-3 py-1 rounded-full">30-45 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                      <span className="text-sm font-bold text-gray-700">Tarif consultation</span>
                      <span className="text-sm font-bold text-green-600 bg-white px-3 py-1 rounded-full">À partir de 80€</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Medical illustration SVG */}
                <div className="absolute -top-12 -left-12 w-40 h-40 opacity-25">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
                    <defs>
                      <linearGradient id="medicalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/> 
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Doctor figure */}
                    <circle cx="50" cy="25" r="12" fill="url(#medicalGradient)" filter="url(#glow)" />
                    <rect x="42" y="37" width="16" height="35" rx="8" fill="url(#medicalGradient)" filter="url(#glow)" />
                    <rect x="30" y="45" width="40" height="12" rx="6" fill="url(#medicalGradient)" filter="url(#glow)" />
                    
                    {/* Stethoscope */}
                    <circle cx="20" cy="75" r="8" fill="url(#medicalGradient)" filter="url(#glow)" />
                    <circle cx="80" cy="75" r="8" fill="url(#medicalGradient)" filter="url(#glow)" />
                    <path d="M20 83 Q50 95 80 83" stroke="url(#medicalGradient)" strokeWidth="4" fill="none" filter="url(#glow)" />
                    
                    {/* Medical symbols */}
                    <rect x="10" y="10" width="3" height="15" rx="1" fill="url(#medicalGradient)" opacity="0.6" />
                    <rect x="5" y="15" width="13" height="3" rx="1" fill="url(#medicalGradient)" opacity="0.6" />
                    
                    <rect x="82" y="10" width="3" height="15" rx="1" fill="url(#medicalGradient)" opacity="0.6" />
                    <rect x="77" y="15" width="13" height="3" rx="1" fill="url(#medicalGradient)" opacity="0.6" />
                  </svg>
                </div>
                
                {/* Enhanced Floating mini cards */}
                <div className="absolute -top-8 -right-8 bg-white rounded-3xl shadow-2xl p-6 border-2 border-gray-100 hover:border-green-200 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <HeartHandshake className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">2.5K+</div>
                      <div className="text-sm text-gray-500 font-medium">Patients soignés</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">15+</div>
                      <div className="text-sm text-gray-500 font-medium">Spécialistes</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Background decoration with medical pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15">
                <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
                  <defs>
                    <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                    </radialGradient>
                  </defs>
                  <path d="M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z" fill="url(#starGradient)" />
                  {/* Additional medical symbols */}
                  <circle cx="25" cy="25" r="3" fill="url(#starGradient)" opacity="0.8" />
                  <circle cx="75" cy="25" r="2" fill="url(#starGradient)" opacity="0.6" />
                  <circle cx="25" cy="75" r="2" fill="url(#starGradient)" opacity="0.7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Users className="w-4 h-4" />
              <span>Nos Résultats</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              La Confiance en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des résultats concrets qui témoignent de notre engagement envers l'excellence médicale.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 group-hover:border-blue-200 group-hover:shadow-2xl group-hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">{stat.number}</div>
                    <div className="text-gray-600 font-bold text-lg group-hover:text-gray-700 transition-colors">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>Excellence Médicale</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">
                Pourquoi Nous Choisir ?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez ce qui fait notre différence dans l'univers des soins médicaux de qualité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Medical icon background */}
                <div className="absolute top-4 right-4 w-16 h-16 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gray-600">
                    {index === 0 && (
                      <>
                        <rect x="35" y="10" width="30" height="80" rx="15" fill="currentColor" />
                        <rect x="10" y="35" width="80" height="30" rx="15" fill="currentColor" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <circle cx="50" cy="20" r="15" fill="currentColor" />
                        <rect x="20" y="35" width="60" height="15" rx="7" fill="currentColor" />
                        <rect x="25" y="55" width="50" height="10" rx="5" fill="currentColor" />
                        <rect x="30" y="70" width="40" height="10" rx="5" fill="currentColor" />
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <path d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z M50 25 C60 25 65 35 65 45 C65 55 55 65 45 65 C35 65 25 55 25 45 C25 35 35 25 50 25 Z" fill="currentColor" />
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <polygon points="50,10 60,35 85,35 67,52 75,77 50,65 25,77 33,52 15,35 40,35" fill="currentColor" />
                      </>
                    )}
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <Calendar className="w-4 h-4" />
              <span>Services de Santé</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Nos Services Spécialisés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Une approche complète et personnalisée pour répondre à tous vos besoins de santé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                  
                  {/* Service illustration background */}
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-5">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-600">
                      {index === 0 && (
                        <>
                          <circle cx="30" cy="25" r="8" fill="currentColor" />
                          <circle cx="70" cy="25" r="8" fill="currentColor" />
                          <circle cx="50" cy="60" r="12" fill="currentColor" />
                          <path d="M20 40 Q50 30 80 40 Q70 70 50 75 Q30 70 20 40" fill="currentColor" opacity="0.7" />
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <rect x="20" y="20" width="60" height="40" rx="8" fill="currentColor" />
                          <rect x="30" y="30" width="40" height="4" rx="2" fill="white" />
                          <rect x="30" y="38" width="30" height="4" rx="2" fill="white" />
                          <rect x="30" y="46" width="35" height="4" rx="2" fill="white" />
                          <circle cx="45" cy="75" r="8" fill="currentColor" />
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <circle cx="50" cy="35" r="15" fill="currentColor" />
                          <path d="M35 50 Q50 45 65 50 L60 75 L40 75 Z" fill="currentColor" />
                          <rect x="45" y="20" width="10" height="8" rx="2" fill="white" />
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <rect x="30" y="15" width="40" height="50" rx="10" fill="currentColor" />
                          <circle cx="40" cy="30" r="4" fill="white" />
                          <circle cx="60" cy="30" r="4" fill="white" />
                          <path d="M35 45 Q50 55 65 45" stroke="white" strokeWidth="3" fill="none" />
                          <rect x="25" y="70" width="50" height="15" rx="7" fill="currentColor" opacity="0.7" />
                        </>
                      )}
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{service.description}</p>
                    <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:gap-3 transition-all duration-300">
                      <span>En savoir plus</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Témoignages Patients</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Ce Que Disent Nos Patients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La satisfaction de nos patients est notre plus belle récompense et notre motivation quotidienne.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 relative">
                  
                  {/* Decorative quote SVG */}
                  <div className="absolute top-4 right-4 w-12 h-12 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                      <path d="M20 30 Q15 25 20 20 Q30 15 35 25 Q40 35 30 40 Q25 45 20 40 Z" fill="currentColor" />
                      <path d="M60 30 Q55 25 60 20 Q70 15 75 25 Q80 35 70 40 Q65 45 60 40 Z" fill="currentColor" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                      « {testimonial.comment} »
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 relative overflow-hidden">
                        <span className="text-white font-bold text-lg relative z-10">{testimonial.name.charAt(0)}</span>
                        
                        {/* Mini user icon background */}
                        <div className="absolute inset-0 opacity-20">
                          <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                            <circle cx="50" cy="35" r="15" fill="currentColor" />
                            <path d="M20 80 Q50 65 80 80 L80 90 Q50 85 20 90 Z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-blue-600 text-sm font-medium">Patient Vérifié</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <ReserveButton className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;