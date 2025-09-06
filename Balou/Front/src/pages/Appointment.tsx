import React, { useState } from 'react';
import { Button } from '../component/ui/button';
import { Clock, Calendar, User, Check, Phone, Mail, MapPin, Stethoscope, FileText, AlertCircle, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  availableSlots: string[];
}

const doctors: Doctor[] = [
  { 
    id: 1, 
    name: "Dr. Sophie Martin", 
    speciality: "Médecin généraliste", 
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
  },
  { 
    id: 2, 
    name: "Dr. Pierre Dubois", 
    speciality: "Cardiologue", 
    availableSlots: ["09:30", "10:30", "14:30", "15:30"]
  },
  { 
    id: 3, 
    name: "Dr. Marie Laurent", 
    speciality: "Pédiatre", 
    availableSlots: ["09:00", "11:00", "14:00", "16:00"]
  },
  { 
    id: 4, 
    name: "Dr. Ahmed Traore", 
    speciality: "Dermatologue", 
    availableSlots: ["10:00", "11:30", "15:00", "16:30"]
  },
  { 
    id: 5, 
    name: "Dr. Fatou Camara", 
    speciality: "Gynécologue", 
    availableSlots: ["08:30", "10:00", "14:30", "17:00"]
  }
];

const Appointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token");

    if (!user || !user._id) {
      setErrorMessage("Veuillez vous connecter ou créer un compte pour prendre un rendez-vous.");
      setIsSubmitting(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!token) {
      setErrorMessage("Session expirée. Veuillez vous reconnecter.");
      setIsSubmitting(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const appointmentDate = new Date(selectedDate);

    const payload = {
      userId: user._id,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender,
      service,
      date: appointmentDate,
      time: selectedTime,
      doctorName: selectedDoctor?.name,
      notes,
      status: "en attente" // Statut par défaut pour les nouveaux rendez-vous
    };

    try {
      console.log("📤 Envoi du rendez-vous...", payload);
      
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Ajout du token d'authentification
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("📥 Réponse du serveur:", data);

      if (response.ok) {
        console.log("✅ Rendez-vous créé avec succès!");
        setShowConfirmation(true);
      } else {
        console.error("❌ Erreur lors de la création:", data);
        setErrorMessage(data?.error || data?.message || "Erreur lors de la création du rendez-vous");
      }
    } catch (error) {
      console.error("❌ Erreur de communication avec le serveur :", error);
      setErrorMessage("Erreur de communication avec le serveur. Vérifiez votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
            <div className="mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Check className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Félicitations !</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Votre rendez-vous a été confirmé avec succès pour le <br/>
              <span className="font-semibold text-blue-600">{selectedDate}</span> à 
              <span className="font-semibold text-blue-600"> {selectedTime}</span> avec 
              <span className="font-semibold text-green-600">{selectedDoctor?.name}</span>.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">Rappel important</h3>
              </div>
              <p className="text-blue-800 text-sm">
                Vous recevrez un SMS et un email de confirmation. <br/>
                Veuillez arriver 15 minutes avant votre rendez-vous.
              </p>
            </div>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setSelectedDate('');
                setSelectedDoctor(null);
                setSelectedTime('');
                setService('');
                setNotes('');
                setErrorMessage('');
                setIsSubmitting(false);
                setFormData({ fullName: '', email: '', phone: '', age: '', gender: '' });
                navigate("/"); // 🔹 Redirection vers l'accueil
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      {/* Header amélioré */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white opacity-5 rounded-full"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Prendre rendez-vous
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-100">
            Réservez votre consultation avec nos médecins expérimentés. 
            <br className="hidden md:block" />
            Simple, rapide et sécurisé.
          </p>
          <div className="mt-8 flex justify-center items-center space-x-6 text-blue-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Disponible 24h/24</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <span>Service de qualité</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire amélioré */}
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Formulaire de rendez-vous
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Remplissez les informations ci-dessous pour réserver votre créneau avec l'un de nos médecins spécialisés
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Message d'erreur */}
            {errorMessage && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-red-800 font-semibold">Erreur</h3>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
            {/* Informations personnelles améliorées */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-white" />
                </div>
                Informations personnelles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["fullName", "email", "phone", "age"].map((field) => (
                  <div key={field} className="relative">
                    <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-3">
                      {field === "fullName" ? "Nom complet *" :
                       field === "email" ? "Adresse email *" :
                       field === "phone" ? "Numéro de téléphone *" : "Âge *"}
                    </label>
                    <div className="relative">
                      <input
                        type={field === "age" ? "number" : field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                        placeholder={field === "fullName" ? "Entrez votre nom complet" :
                                     field === "email" ? "votre@email.com" :
                                     field === "phone" ? "+224 123 456 789" : "Ex: 25"}
                      />
                      {field === "email" && (
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      )}
                      {field === "phone" && (
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}

                <div className="relative">
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-3">
                    Sexe *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="">✨ Sélectionnez votre sexe</option>
                    <option value="Homme">👨 Homme</option>
                    <option value="Femme">👩 Femme</option>
                    <option value="Autre">🏳️‍⚧️ Autre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Service amélioré */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Stethoscope className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Type de consultation</h3>
              </div>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 bg-white shadow-sm text-lg"
                required
              >
                <option value="">🎯 Sélectionnez le type de consultation</option>
                <option value="consultation">👩‍⚕️ Consultation générale</option>
                <option value="cardiologie">❤️ Cardiologie</option>
                <option value="pediatrie">👶 Pédiatrie</option>
                <option value="dermatologie">🧤 Dermatologie</option>
                <option value="gynecologie">👩‍⚕️ Gynécologie</option>
                <option value="urgences">🆘 Urgences</option>
              </select>
            </div>

            {/* Date améliorée */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Choisir une date</h3>
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 z-10" size={20} />
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 bg-white shadow-sm text-lg"
                  required
                />
              </div>
            </div>

            {/* Médecins améliorés */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Sélectionner un médecin</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedDoctor?.id === doctor.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg ring-4 ring-blue-100' 
                        : 'border-gray-200 hover:border-blue-300 bg-white hover:shadow-md'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                        selectedDoctor?.id === doctor.id ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        <User className={`h-6 w-6 ${
                          selectedDoctor?.id === doctor.id ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{doctor.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{doctor.speciality}</p>
                      <div className="flex items-center text-xs text-green-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{doctor.availableSlots.length} créneaux disponibles</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horaires améliorés */}
            {selectedDoctor && (
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Horaires disponibles avec {selectedDoctor.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {selectedDoctor.availableSlots.map((time) => (
                    <div
                      key={time}
                      className={`p-4 border-2 rounded-xl cursor-pointer text-center transition-all duration-300 transform hover:scale-105 ${
                        selectedTime === time 
                          ? 'border-teal-500 bg-teal-50 shadow-lg ring-4 ring-teal-100' 
                          : 'border-gray-200 hover:border-teal-300 bg-white hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className={`h-6 w-6 mx-auto mb-2 ${
                        selectedTime === time ? 'text-teal-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-lg font-semibold ${
                        selectedTime === time ? 'text-teal-900' : 'text-gray-700'
                      }`}>{time}</span>
                      <div className={`text-xs mt-1 ${
                        selectedTime === time ? 'text-teal-600' : 'text-gray-500'
                      }`}>
                        Disponible
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes améliorées */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-8 rounded-2xl border border-rose-100">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Motif de consultation</h3>
              </div>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-100 focus:border-rose-500 transition-all duration-200 bg-white shadow-sm resize-none"
                placeholder="Décrivez brièvement la raison de votre visite, vos symptômes ou vos préoccupations médicales..."
              />
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Ces informations aideront le médecin à mieux préparer votre consultation
              </p>
            </div>

            {/* Bouton de soumission amélioré */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:shadow-md disabled:cursor-not-allowed"
                disabled={
                  isSubmitting ||
                  !selectedDate ||
                  !selectedDoctor ||
                  !selectedTime ||
                  !service ||
                  !formData.fullName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.age ||
                  !formData.gender
                }
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Check className="h-6 w-6 mr-2" />
                      Confirmer mon rendez-vous
                    </>
                  )}
                </span>
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                En confirmant, vous acceptez nos conditions de service et notre politique de confidentialité
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Informations importantes améliorées */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Informations importantes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tout ce que vous devez savoir pour votre rendez-vous
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Avant votre rendez-vous
                </h3>
                <ul className="text-gray-600 space-y-3 text-left">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Arrivez 15 minutes avant l'heure
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Apportez votre pièce d'identité
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Préparez vos documents médicaux
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Listez vos questions au médecin
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Modification/Annulation
                </h3>
                <ul className="text-gray-600 space-y-3 text-left">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Prévenez 24h à l'avance minimum
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Appelez le +224 613 16 25 89
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Email: info@nafasante.com
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Confirmation par SMS/Email
                  </li>
                </ul>
              </div>
              <div className="text-center md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Localisation
                </h3>
                <ul className="text-gray-600 space-y-3 text-left">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Clinique NAFA SANTÉ
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Conakry, Guinée
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Parking gratuit disponible
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Accès PMR aménagé
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Section contact d'urgence */}
            <div className="mt-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                  <AlertCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  En cas d'urgence médicale
                </h3>
              </div>
              <p className="text-center text-gray-700">
                Appelez immédiatement le <span className="font-bold text-red-600">+224 613 16 25 89</span>
                <br />
                ou présentez-vous directement à notre service d'urgence 24h/24
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
