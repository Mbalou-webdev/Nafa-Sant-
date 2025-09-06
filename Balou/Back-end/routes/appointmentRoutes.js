import express from 'express';
import { 
  createAppointment, 
  getAppointments, 
  getUserAppointments, 
  updateAppointmentStatus, 
  deleteAppointment 
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
router.patch('/:id', verifyToken, updateAppointmentStatus);

// Supprimer un rendez-vous
router.delete('/:id', verifyToken, verifyAdmin, deleteAppointment);

export default router;
