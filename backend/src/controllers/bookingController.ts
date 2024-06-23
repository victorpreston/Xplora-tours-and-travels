import { Request, Response } from 'express';
import { createBooking, getBookingsByUser, getBookingById, cancelBooking } from '../services/bookingService';
import { Booking } from '../interfaces/bookingInterface';

export const createBookingController = async (req: Request, res: Response) => {
  const bookingData: Booking = req.body;

  try {
    const booking = await createBooking(bookingData);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Error creating booking.' });
  }
};

export const getBookingsByUserController = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const bookings = await getBookingsByUser(userId);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching bookings.' });
  }
};

export const getBookingByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching booking.' });
  }
};

export const cancelBookingController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await cancelBooking(id);
    res.json({ message: 'Booking canceled successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error canceling booking.' });
  }
};