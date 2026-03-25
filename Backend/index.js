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

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://todo-list-mern-amber.vercel.app',
  'https://todo-list-mern-git-main-soumens-projects-f9cc2fe2.vercel.app',
];

const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin header) such as curl/postman/server-to-server.
      if (!origin) return callback(null, true);

      const isExactAllowed = allowedOrigins.includes(origin);
      const isVercelPreview = origin.endsWith('.vercel.app');

      if (isExactAllowed || isVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);


app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Server Started ✔️ ${PORT}`);
});