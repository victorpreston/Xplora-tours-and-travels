import { PrismaClient } from '@prisma/client';
import { Booking } from '../interfaces/bookingInterface';

const prisma = new PrismaClient();

export const createBooking = async (data: Booking) => {
  return prisma.booking.create({
    data,
  });
};

export const getBookingsByUser = async (userId: string) => {
  return prisma.booking.findMany({
    where: { userId },
  });
};

export const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
  });
};

export const cancelBooking = async (id: string) => {
  return prisma.booking.delete({
    where: { id },
  });
};