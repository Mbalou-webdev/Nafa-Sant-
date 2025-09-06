import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import connectDB from '../config/db.js';

// Script pour nettoyer les rendez-vous de test
const cleanTestAppointments = async () => {
  try {
    console.log('🔄 Connexion à la base de données...');
    await connectDB();

    // Compter les rendez-vous existants
    const totalBefore = await Appointment.countDocuments();
    console.log(`📊 Nombre total de rendez-vous avant nettoyage: ${totalBefore}`);

    // Supprimer les anciens rendez-vous de test
    const deleteResult = await Appointment.deleteMany({
      $or: [
        { email: { $regex: /test\.com$/i } },
        { email: { $regex: /example\.com$/i } },
        { fullName: { $regex: /test/i } }
      ]
    });

    console.log(`🗑️ ${deleteResult.deletedCount} rendez-vous de test supprimés`);

    // Compter les rendez-vous restants
    const totalAfter = await Appointment.countDocuments();
    console.log(`📊 Nombre total de rendez-vous après nettoyage: ${totalAfter}`);

    // Afficher les rendez-vous restants
    if (totalAfter > 0) {
      console.log('\n📋 Rendez-vous restants:');
      const remainingAppointments = await Appointment.find().sort({ date: -1, time: -1 }).limit(5);
      remainingAppointments.forEach((appt, index) => {
        console.log(`   ${index + 1}. ${appt.fullName} - ${appt.email} - ${appt.service} - ${appt.status}`);
      });
    } else {
      console.log('\n✨ Aucun rendez-vous restant dans la base de données');
    }

    mongoose.connection.close();
    console.log('\n🔐 Connexion fermée.');
    console.log('✅ Nettoyage terminé !');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    process.exit(1);
  }
};

// Exécuter le script
cleanTestAppointments();