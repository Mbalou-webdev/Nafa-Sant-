import Appointment from '../models/Appointment.js';

// Créer un rendez-vous (patient connecté)
export const createAppointment = async (req, res) => {
  try {
    // Utiliser l'ID du patient depuis le token JWT
    const userId = req.user?.id || req.body.userId;
    
    console.log('📨 Nouvelle demande de rendez-vous reçue');
    console.log('👤 Utilisateur:', { id: userId, role: req.user?.role });
    console.log('📄 Données reçues:', req.body);

    const {
      fullName,
      email,
      phone,
      age,
      gender,
      service,
      date,
      time,
      doctorName,
      notes,
      motif,
      diagnostic,
      status = 'en attente' // Statut par défaut
    } = req.body;

    // Validation des champs requis
    if (!fullName || !email || !phone || !age || !gender || !service || !date || !time || !doctorName) {
      console.log('❌ Champs manquants détectés');
      return res.status(400).json({ 
        error: 'Tous les champs obligatoires doivent être remplis',
        missing: { fullName: !fullName, email: !email, phone: !phone, age: !age, gender: !gender, service: !service, date: !date, time: !time, doctorName: !doctorName }
      });
    }

    const appointment = new Appointment({
      userId,
      fullName,
      email,
      phone,
      age,
      gender,
      service,
      date: new Date(date),
      time,
      doctorName,
      notes: notes || motif, // Utiliser notes ou motif
      motif: notes || motif,
      diagnostic,
      status,
      createdAt: new Date()
    });

    const savedAppointment = await appointment.save();
    console.log('✅ Rendez-vous créé avec succès:', savedAppointment._id);
    
    res.status(201).json({ 
      message: 'Rendez-vous enregistré avec succès', 
      appointment: savedAppointment 
    });
  } catch (error) {
    console.error('❌ Erreur lors de la création du rendez-vous :', error);
    res.status(500).json({ 
      error: 'Erreur lors de la création du rendez-vous',
      details: error.message 
    });
  }
};

// Récupérer les rendez-vous du patient connecté (sécurisé)
export const getUserAppointments = async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const authenticatedUserId = req.user.id;
    const userRole = req.user.role;

    // Vérification de sécurité : un utilisateur ne peut voir que ses propres RDV (sauf admin)
    if (userRole !== 'admin' && requestedUserId !== authenticatedUserId) {
      console.log('❌ Tentative d\'accès non autorisée:', {
        requestedUserId,
        authenticatedUserId,
        userRole
      });
      return res.status(403).json({ 
        error: "Accès refusé. Vous ne pouvez voir que vos propres rendez-vous." 
      });
    }

    const userId = requestedUserId || authenticatedUserId;

    if (!userId) {
      return res.status(400).json({ error: "ID utilisateur manquant" });
    }

    const appointments = await Appointment.find({ userId }).sort({ date: -1, time: -1 });
    console.log('✅ Rendez-vous récupérés pour utilisateur:', userId, 'Nombre:', appointments.length);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
};

// Récupérer tous les rendez-vous (Admin uniquement)
export const getAppointments = async (req, res) => {
  try {
    // Le middleware verifyAdmin a déjà vérifié que l'utilisateur est admin
    const appointments = await Appointment.find().sort({ date: -1, time: -1 });
    console.log("📅 Rendez-vous récupérés :", appointments.length);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
};

// Mettre à jour le statut, motif ou diagnostic (Admin uniquement - vérifié par middleware)
export const updateAppointmentStatus = async (req, res) => {
  try {
    // Les middlewares verifyToken et verifyAdmin ont déjà vérifié les permissions
    const updateData = {};
    
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.motif !== undefined) updateData.motif = req.body.motif;
    if (req.body.diagnostic !== undefined) updateData.diagnostic = req.body.diagnostic;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    
    console.log('📝 Rendez-vous mis à jour par admin:', req.user.email, updateData);
    res.json(appointment);
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour :', err);
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un rendez-vous (Admin uniquement)
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Le middleware verifyAdmin a déjà vérifié que l'utilisateur est admin
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    console.log('✅ Rendez-vous supprimé par admin:', req.user.email, 'ID:', id);
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression rendez-vous:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
  }
};

// Annuler un rendez-vous (Utilisateur propriétaire ou Admin)
export const cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    // Trouver le rendez-vous
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }

    // Vérifier que l'utilisateur peut annuler ce RDV
    if (userRole !== 'admin' && appointment.userId.toString() !== userId) {
      console.log('❌ Tentative d\'annulation non autorisée:', {
        appointmentUserId: appointment.userId,
        requestUserId: userId,
        userRole
      });
      return res.status(403).json({ 
        message: 'Vous ne pouvez annuler que vos propres rendez-vous' 
      });
    }

    // Mettre à jour le statut à "annulé"
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'annulé' },
      { new: true }
    );

    console.log('✅ Rendez-vous annulé par utilisateur:', req.user.email, 'ID:', id);
    res.status(200).json({ 
      message: 'Rendez-vous annulé avec succès',
      appointment: updatedAppointment
    });
  } catch (error) {
    console.error('Erreur annulation rendez-vous:', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'annulation' });
  }
};
