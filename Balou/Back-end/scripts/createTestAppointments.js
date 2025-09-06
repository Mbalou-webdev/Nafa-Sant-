import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Utilisateur from '../models/UserModel.js';
import connectDB from '../config/db.js';

// Script pour créer des rendez-vous de test
const createTestAppointments = async () => {
  try {
    console.log('🔄 Connexion à la base de données...');
    await connectDB();

    // Chercher un utilisateur existant ou créer un utilisateur de test
    let testUser = await Utilisateur.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      console.log('👤 Création d\'un utilisateur de test...');
      testUser = new Utilisateur({
        firstName: 'John',
        lastName: 'Doe',
        phone: '+33123456789',
        email: 'test@example.com',
        password: 'hashedpassword123',
        role: 'utilisateur'
      });
      await testUser.save();
    }

    console.log('📋 Création de rendez-vous de test...');

    const testAppointments = [
      {
        userId: testUser._id,
        fullName: 'John Doe',
        email: 'test@example.com',
        phone: '+33123456789',
        age: 35,
        gender: 'Homme',
        service: 'Consultation Générale',
        date: new Date('2025-09-10'),
        time: '14:30',
        doctorName: 'Dr. Martin Dupont',
        notes: 'Fatigue générale et maux de tête',
        diagnostic: 'Syndrome grippal léger. Repos recommandé.',
        status: 'confirmé',
        createdAt: new Date()
      },
      {
        userId: testUser._id,
        fullName: 'Marie Durand',
        email: 'marie@example.com',
        phone: '+33987654321',
        age: 28,
        gender: 'Femme',
        service: 'Cardiologie',
        date: new Date('2025-09-12'),
        time: '10:00',
        doctorName: 'Dr. Sophie Leclerc',
        notes: 'Palpitations et essoufflement à l\'effort',
        diagnostic: 'Arythmie légère. Surveillance cardiaque recommandée.',
        status: 'confirmé',
        createdAt: new Date()
      },
      {
        userId: testUser._id,
        fullName: 'Pierre Martin',
        email: 'pierre@example.com',
        phone: '+33555123456',
        age: 42,
        gender: 'Homme',
        service: 'Gastro-entérologie',
        date: new Date('2025-09-08'),
        time: '16:45',
        doctorName: 'Dr. Paul Moreau',
        notes: 'Douleurs abdominales récurrentes',
        diagnostic: 'Gastrite chronique. Traitement médical prescrit.',
        status: 'confirmé',
        createdAt: new Date()
      },
      {
        userId: testUser._id,
        fullName: 'Amélie Rousseau',
        email: 'amelie@example.com',
        phone: '+33666789012',
        age: 30,
        gender: 'Femme',
        service: 'Dermatologie',
        date: new Date('2025-09-15'),
        time: '11:15',
        doctorName: 'Dr. Claire Fontaine',
        notes: 'Eruption cutanée sur les bras',
        status: 'en attente',
        createdAt: new Date()
      },
      {
        userId: testUser._id,
        fullName: 'Thomas Bernard',
        email: 'thomas@example.com',
        phone: '+33777890123',
        age: 38,
        gender: 'Homme',
        service: 'Orthopédie',
        date: new Date('2025-09-20'),
        time: '09:30',
        doctorName: 'Dr. Michel Leroy',
        notes: 'Douleur au genou droit depuis 2 semaines',
        status: 'en attente',
        createdAt: new Date()
      }
    ];

    // Supprimer les anciens rendez-vous de test
    await Appointment.deleteMany({ 
      email: { 
        $in: ['test@example.com', 'marie@example.com', 'pierre@example.com', 'amelie@example.com', 'thomas@example.com'] 
      } 
    });

    // Insérer les nouveaux rendez-vous
    const inserted = await Appointment.insertMany(testAppointments);
    
    console.log(`✅ ${inserted.length} rendez-vous de test créés avec succès !`);
    console.log('📊 Rendez-vous créés :');
    inserted.forEach((appt, index) => {
      console.log(`   ${index + 1}. ${appt.fullName} - ${appt.service} - ${appt.date.toLocaleDateString()} à ${appt.time}`);
    });

    mongoose.connection.close();
    console.log('🔐 Connexion fermée.');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des rendez-vous de test:', error);
    process.exit(1);
  }
};

// Exécuter le script
createTestAppointments();