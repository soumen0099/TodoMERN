import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config(); 
connectDB();     

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);


app.listen(PORT, () => {
  console.log(`Server Started ✔️ ${PORT}`);
});