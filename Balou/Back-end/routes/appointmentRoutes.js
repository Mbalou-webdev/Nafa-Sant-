import express from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getUserAppointments, 
  updateAppointmentStatus, 
  deleteAppointment,
  cancelAppointment
} from '../controllers/AppointmentController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Créer un rendez-vous
router.post('/', verifyToken, createAppointment);

// Récupérer tous les rendez-vous
router.get('/', verifyToken, verifyAdmin, getAppointments);

// Récupérer les rendez-vous d’un utilisateur
router.get('/user/:userId', verifyToken, getUserAppointments);

// Mettre à jour statut/motif/diagnostic d’un rendez-vous
router.patch('/:id', verifyToken, verifyAdmin, updateAppointmentStatus);

// Supprimer un rendez-vous (Admin uniquement)
router.delete('/:id', verifyToken, verifyAdmin, deleteAppointment);

// Annuler un rendez-vous (Utilisateur propriétaire ou Admin)
router.patch('/:id/cancel', verifyToken, cancelAppointment);

export default router;
