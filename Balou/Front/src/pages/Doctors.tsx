import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Phone, Lock, Stethoscope, Award, CheckCircle, Calendar, ArrowRight, Activity, Users, Shield, Heart, Brain, Eye } from 'lucide-react';
import { Button } from '../component/ui/button';

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  location: string;
  phone: string;
  availableSlots: string[];
  image: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    speciality: "Médecin généraliste",
    experience: "15 ans d'expérience",
    rating: 4.8,
    location: "Aile A, 2ème étage",
    phone: "0123456789",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Dr. Pierre Dubois",
    speciality: "Cardiologue",
    experience: "20 ans d'expérience",
    rating: 4.9,
    location: "Aile B, 3ème étage",
    phone: "0123456790",
    availableSlots: ["09:30", "10:30", "14:30", "15:30"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Dr. Marie Laurent",
    speciality: "Pédiatre",
    experience: "12 ans d'expérience",
    rating: 4.7,
    location: "Aile C, 1er étage",
    phone: "0123456791",
    availableSlots: ["09:00", "11:00", "14:00", "16:00"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  
];


const Doctors = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAppointment = () => {
    if (!isAuthenticated) {
      setShowAuthMessage(true);
      setTimeout(() => {
        localStorage.setItem('redirectAfterLogin', '/appointment');
        navigate('/register');
        window.scrollTo(0, 0);
      }, 2000);
    } else {
      navigate('/appointment');
    }
  };

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
      {showAuthMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-4">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentification requise</h3>
            <p className="text-gray-600 mb-6">
              Veuillez vous inscrire puis vous connecter pour prendre un rendez-vous.
            </p>
            <p className="text-sm text-blue-600">Redirection vers l'inscription...</p>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 border-2 border-white/20 rounded-full" style={{animation: 'backgroundShift 25s linear infinite'}}></div>
          <div className="absolute bottom-20 right-20 w-56 h-56 border border-white/10 rounded-full" style={{animation: 'backgroundShift 20s linear infinite reverse'}}></div>
          <div className="absolute top-1/2 left-10 w-40 h-40 bg-white/5 rounded-full" style={{animation: 'pulse 4s ease-in-out infinite'}}></div>
        </div>
        
        {/* Medical Team Illustration Background */}
        <div className="absolute top-10 right-10 w-96 h-96 opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full text-white">
            <defs>
              <linearGradient id="doctorsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Multiple doctor figures */}
            <circle cx="120" cy="80" r="25" fill="url(#doctorsGradient)" />
            <rect x="105" y="105" width="30" height="60" rx="15" fill="url(#doctorsGradient)" />
            <circle cx="280" cy="80" r="22" fill="url(#doctorsGradient)" />
            <rect x="268" y="102" width="24" height="50" rx="12" fill="url(#doctorsGradient)" />
            <circle cx="200" cy="120" r="20" fill="url(#doctorsGradient)" />
            <rect x="190" y="140" width="20" height="45" rx="10" fill="url(#doctorsGradient)" />
            {/* Medical equipment */}
            <rect x="150" y="250" width="20" height="80" rx="10" fill="url(#doctorsGradient)" />
            <rect x="130" y="270" width="60" height="20" rx="10" fill="url(#doctorsGradient)" />
            {/* Stethoscope */}
            <circle cx="300" cy="200" r="15" fill="url(#doctorsGradient)" />
            <path d="M300 215 Q330 230 350 260 Q360 280 350 300 Q340 310 330 300 Q320 290 330 280 Q340 270 330 250 Q310 235 300 215" stroke="url(#doctorsGradient)" strokeWidth="8" fill="none" />
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-xl">
            <Stethoscope className="w-5 h-5" />
            <span>Équipe Médicale d'Excellence</span>
            <Star className="w-4 h-4 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="drop-shadow-lg">
              Nos Médecins
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Experts
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Rencontrez notre équipe de médecins hautement qualifiés, dédiés à vous offrir les meilleurs soins de santé avec expertise et compassion.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-blue-300/50 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <Button
                onClick={handleAppointment}
                className="relative bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Prendre Rendez-vous
              </Button>
            </div>
            <button className="group flex items-center justify-center gap-3 border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 backdrop-blur-xl">
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Nous Contacter
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Doctors Grid */}
      <section className="py-24 relative">
        {/* Medical Background Pattern */}
        <div className="absolute top-20 left-20 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500">
            <defs>
              <linearGradient id="doctorsBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect x="80" y="60" width="20" height="80" rx="10" fill="url(#doctorsBgGradient)" />
            <rect x="60" y="80" width="80" height="20" rx="10" fill="url(#doctorsBgGradient)" />
            <circle cx="50" cy="50" r="15" fill="url(#doctorsBgGradient)" />
            <circle cx="150" cy="150" r="12" fill="url(#doctorsBgGradient)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Users className="w-5 h-5" />
              <span className="font-bold">Professionnels Certifiés</span>
              <Award className="w-4 h-4 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Notre Équipe</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">Médicale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des médecins expérimentés et dévoués, formés dans les meilleures institutions, pour vous garantir des soins de la plus haute qualité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 hover:border-blue-200">
                {/* Enhanced Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                    <circle cx="20" cy="20" r="8" fill="currentColor" />
                    <circle cx="80" cy="80" r="6" fill="currentColor" />
                    <rect x="40" y="10" width="4" height="20" rx="2" fill="currentColor" />
                    <rect x="30" y="20" width="20" height="4" rx="2" fill="currentColor" />
                  </svg>
                </div>
                
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{doctor.name}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-lg font-semibold text-blue-600">{doctor.speciality}</p>
                    </div>
                    <p className="text-gray-600 font-medium">{doctor.experience}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      <MapPin className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{doctor.location}</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      <Phone className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{doctor.phone}</span>
                    </div>
                    <div className="flex items-center p-3 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors">
                      <Clock className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-700 font-medium">Prochaine disponibilité</span>
                        <p className="text-sm text-purple-600 font-bold">{doctor.availableSlots[0]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="relative group flex-1">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                      <Button
                        onClick={handleAppointment}
                        className={`relative w-full font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
                          isAuthenticated 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                            : 'bg-gray-500 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {isAuthenticated ? (
                          <>
                            <Calendar className="h-5 w-5" />
                            Prendre RDV
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Prendre RDV
                          </>
                        )}
                      </Button>
                    </div>

                    <Button
                      onClick={() => window.open(`tel:${doctor.phone}`, '_self')}
                      className="group flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
