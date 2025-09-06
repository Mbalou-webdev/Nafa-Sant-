import jwt from 'jsonwebtoken';
import Utilisateur from '../models/UserModel.js';

const JWT_SECRET = process.env.JWT_SECRET || "sMaSuperCleUltraSecrete123";

// Middleware pour vérifier le token JWT
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Utilisateur.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token invalide. Utilisateur non trouvé.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('❌ Erreur de vérification du token:', error);
    res.status(401).json({ message: 'Token invalide.' });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
export const verifyAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Utilisateur non authentifié.' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Droits administrateur requis.' });
    }

    next();
  } catch (error) {
    console.error('❌ Erreur de vérification admin:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la vérification des droits.' });
  }
};