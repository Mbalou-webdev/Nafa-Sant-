import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

// Connexion à la base MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import userRoutes from "./routes/userRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';

app.use("/api", userRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
