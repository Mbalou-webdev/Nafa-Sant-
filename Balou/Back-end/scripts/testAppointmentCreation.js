import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Utilisateur from '../models/UserModel.js';
import connectDB from '../config/db.js';

// Script pour tester la création de rendez-vous
const testAppointmentCreation = async () => {
  try {
    console.log('🔄 Connexion à la base de données...');
    await connectDB();

    // Chercher ou créer un utilisateur de test
    let testUser = await Utilisateur.findOne({ email: 'patient@test.com' });
    
    if (!testUser) {
      console.log('👤 Création d\'un utilisateur patient de test...');
      testUser = new Utilisateur({
        firstName: 'Patient',
        lastName: 'Test',
        phone: '+33123456789',
        email: 'patient@test.com',
        password: 'hashedpassword123',
        role: 'utilisateur'
      });
      await testUser.save();
      console.log('✅ Utilisateur créé:', testUser._id);
    } else {
      console.log('👤 Utilisateur trouvé:', testUser._id);
    }

    // Créer un rendez-vous de test
    const testAppointment = {
      userId: testUser._id,
      fullName: 'Patient Test',
      email: 'patient@test.com',
      phone: '+33123456789',
      age: 30,
      gender: 'Homme',
      service: 'consultation',
      date: new Date('2025-09-15'),
      time: '14:30',
      doctorName: 'Dr. Sophie Martin',
      notes: 'Test de création de rendez-vous depuis le formulaire',
      status: 'en attente',
      createdAt: new Date()
    };

    console.log('📋 Création du rendez-vous de test...');
    const appointment = new Appointment(testAppointment);
    const savedAppointment = await appointment.save();
    
    console.log('✅ Rendez-vous créé avec succès !');
    console.log('📊 Détails du rendez-vous:');
    console.log('   ID:', savedAppointment._id);
    console.log('   Patient:', savedAppointment.fullName);
    console.log('   Service:', savedAppointment.service);
    console.log('   Date:', savedAppointment.date.toLocaleDateString());
    console.log('   Heure:', savedAppointment.time);
    console.log('   Médecin:', savedAppointment.doctorName);
    console.log('   Statut:', savedAppointment.status);

    // Vérifier que le rendez-vous est bien récupérable côté admin
    console.log('\n🔍 Vérification côté admin...');
    const allAppointments = await Appointment.find().sort({ date: -1, time: -1 });
    console.log(`📅 Total des rendez-vous dans la base: ${allAppointments.length}`);
    
    const recentAppointments = allAppointments.slice(0, 3);
    console.log('📋 3 derniers rendez-vous:');
    recentAppointments.forEach((appt, index) => {
      console.log(`   ${index + 1}. ${appt.fullName} - ${appt.service} - ${appt.date.toLocaleDateString()} à ${appt.time} (${appt.status})`);
    });

    mongoose.connection.close();
    console.log('\n🔐 Connexion fermée.');
    console.log('✅ Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    process.exit(1);
  }
};

// Exécuter le script
testAppointmentCreation();