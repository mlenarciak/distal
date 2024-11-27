import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as authRouter } from './routes/auth.js';
import { router as datasetsRouter } from './routes/datasets.js';
import { router as jobsRouter } from './routes/jobs.js';
import { db } from './db/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://dainty-smakager-e758b6.netlify.app'
    : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/datasets', datasetsRouter);
app.use('/api/jobs', jobsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});