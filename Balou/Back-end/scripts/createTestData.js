import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Utilisateur from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import connectDB from '../config/db.js';

// Script pour créer des données de test pour le dashboard
const createTestData = async () => {
  try {
    console.log('🔄 Connexion à la base de données...');
    await connectDB();

    // Créer un utilisateur admin si il n'existe pas
    let adminUser = await Utilisateur.findOne({ email: 'admin@test.com' });
    if (!adminUser) {
      console.log('👑 Création d\'un utilisateur admin...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = new Utilisateur({
        firstName: 'Admin',
        lastName: 'Test',
        phone: '+33100000000',
        email: 'admin@test.com',
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Admin créé:', adminUser.email);
    }

    // Créer des utilisateurs de test
    const testUsers = [
      {
        firstName: 'Marie',
        lastName: 'Dupont',
        phone: '+33123456789',
        email: 'marie@test.com',
        password: await bcrypt.hash('patient123', 10),
        role: 'utilisateur'
      },
      {
        firstName: 'Pierre',
        lastName: 'Martin',
        phone: '+33987654321',
        email: 'pierre@test.com',
        password: await bcrypt.hash('patient123', 10),
        role: 'utilisateur'
      },
      {
        firstName: 'Sophie',
        lastName: 'Rousseau',
        phone: '+33555666777',
        email: 'sophie@test.com',
        password: await bcrypt.hash('patient123', 10),
        role: 'utilisateur'
      }
    ];

    console.log('👥 Création des utilisateurs de test...');
    const createdUsers = [];
    for (const userData of testUsers) {
      const existingUser = await Utilisateur.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new Utilisateur(userData);
        await user.save();
        createdUsers.push(user);
        console.log('✅ Utilisateur créé:', user.email);
      } else {
        createdUsers.push(existingUser);
        console.log('👤 Utilisateur existant:', existingUser.email);
      }
    }

    // Créer des rendez-vous de test avec différents statuts
    const testAppointments = [
      {
        userId: createdUsers[0]._id,
        fullName: 'Marie Dupont',
        email: 'marie@test.com',
        phone: '+33123456789',
        age: 28,
        gender: 'Femme',
        service: 'Consultation Générale',
        date: new Date('2025-09-10'),
        time: '14:30',
        doctorName: 'Dr. Martin',
        notes: 'Contrôle de routine',
        status: 'confirmé',
        createdAt: new Date()
      },
      {
        userId: createdUsers[1]._id,
        fullName: 'Pierre Martin',
        email: 'pierre@test.com',
        phone: '+33987654321',
        age: 35,
        gender: 'Homme',
        service: 'Dermatologie',
        date: new Date('2025-09-12'),
        time: '10:00',
        doctorName: 'Dr. Claire',
        notes: 'Vérification grain de beauté',
        status: 'en attente',
        createdAt: new Date()
      },
      {
        userId: createdUsers[2]._id,
        fullName: 'Sophie Rousseau',
        email: 'sophie@test.com',
        phone: '+33555666777',
        age: 42,
        gender: 'Femme',
        service: 'Cardiologie',
        date: new Date('2025-09-08'),
        time: '16:15',
        doctorName: 'Dr. Durand',
        notes: 'Suivi hypertension',
        status: 'confirmé',
        createdAt: new Date()
      },
      {
        userId: createdUsers[0]._id,
        fullName: 'Marie Dupont',
        email: 'marie@test.com',
        phone: '+33123456789',
        age: 28,
        gender: 'Femme',
        service: 'Ophtalmologie',
        date: new Date('2025-09-05'),
        time: '09:30',
        doctorName: 'Dr. Leroy',
        notes: 'Contrôle vision',
        status: 'annulé',
        createdAt: new Date()
      },
      {
        userId: createdUsers[1]._id,
        fullName: 'Pierre Martin',
        email: 'pierre@test.com',
        phone: '+33987654321',
        age: 35,
        gender: 'Homme',
        service: 'Consultation Générale',
        date: new Date(), // Aujourd'hui
        time: '11:00',
        doctorName: 'Dr. Moreau',
        notes: 'Fatigue chronique',
        status: 'en attente',
        createdAt: new Date()
      }
    ];

    console.log('📅 Création des rendez-vous de test...');
    
    // Supprimer les anciens rendez-vous de test
    await Appointment.deleteMany({ 
      email: { $in: ['marie@test.com', 'pierre@test.com', 'sophie@test.com'] } 
    });

    // Insérer les nouveaux rendez-vous
    const insertedAppointments = await Appointment.insertMany(testAppointments);
    console.log('✅ Rendez-vous créés:', insertedAppointments.length);

    // Afficher un résumé
    const totalUsers = await Utilisateur.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const confirmedAppointments = await Appointment.countDocuments({ status: { $in: ['confirmé', 'confirmed'] } });
    const pendingAppointments = await Appointment.countDocuments({ status: { $in: ['en attente', 'pending'] } });
    const cancelledAppointments = await Appointment.countDocuments({ status: { $in: ['annulé', 'cancelled'] } });

    console.log('\n📊 RÉSUMÉ DES DONNÉES:');
    console.log('👥 Total utilisateurs:', totalUsers);
    console.log('📅 Total rendez-vous:', totalAppointments);
    console.log('✅ Confirmés:', confirmedAppointments);
    console.log('⏳ En attente:', pendingAppointments);
    console.log('❌ Annulés:', cancelledAppointments);

    console.log('\n🎉 Données de test créées avec succès!');
    console.log('📌 Vous pouvez maintenant vous connecter avec:');
    console.log('   Email: admin@test.com');
    console.log('   Mot de passe: admin123');

  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connexion fermée');
  }
};

// Exécuter le script
createTestData();