import express from 'express';
import {
  createBookingController,
  getBookingsByUserController,
  getBookingByIdController,
  cancelBookingController,
} from '../controllers/bookingController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/bookings', auth, createBookingController);
router.get('/bookings', auth, getBookingsByUserController);
router.get('/bookings/:id', auth, getBookingByIdController);
router.delete('/bookings/:id', auth, cancelBookingController);

export default router;