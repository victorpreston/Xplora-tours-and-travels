import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import tourRoutes from './routes/tourRoutes';
import bookingRoutes from './routes/bookingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Verify that JWT_SECRET is loaded correctly
console.log('JWT_SECRET:', process.env.JWT_SECRET);

app.use('/api/auth', authRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/api', tourRoutes);
app.use('/api', bookingRoutes);
app.use('/api', reviewRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
  res.send('Xplora Tours and Travels API');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;