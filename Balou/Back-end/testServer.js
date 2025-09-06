// Script de test pour vérifier les routes
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route simple
app.delete('/api/users/:id', (req, res) => {
  console.log('Route DELETE /api/users/:id appelée avec ID:', req.params.id);
  res.json({ message: 'Route DELETE fonctionne', userId: req.params.id });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Serveur de test fonctionnel' });
});

const PORT = 5001; // Port différent pour éviter les conflits
app.listen(PORT, () => {
  console.log(`🧪 Serveur de test démarré sur le port ${PORT}`);
  console.log(`Test avec: http://localhost:${PORT}/api/test`);
});