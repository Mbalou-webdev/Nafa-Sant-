import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUsers, 
  updateUser,   // ✅ Ajouté ici
  deleteUser 
} from "../controllers/UserController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ▶ Inscription utilisateur
router.post("/register", registerUser);

// ▶ Connexion utilisateur
router.post("/login", loginUser);

// ▶ Récupérer tous les utilisateurs (admin seulement)
router.get("/users", verifyToken, verifyAdmin, getUsers);
router.get("/", verifyToken, verifyAdmin, getUsers);

// ▶ Mettre à jour un utilisateur (admin seulement)
router.patch("/users/:id", verifyToken, verifyAdmin, updateUser);

// ▶ Supprimer un utilisateur (admin seulement)
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
