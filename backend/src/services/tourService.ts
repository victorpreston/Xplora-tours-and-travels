import { PrismaClient } from '@prisma/client';
import { Tour } from '../interfaces/tourInterface';

const prisma = new PrismaClient();

export const createTour = async (data: Tour) => {
  return prisma.tour.create({
    data,
  });
};

export const getAllTours = async () => {
  return prisma.tour.findMany({
    where: { isActive: true },
  });
};

export const getTourById = async (id: string) => {
  return prisma.tour.findUnique({
    where: { id },
  });
};

export const updateTour = async (id: string, data: Partial<Tour>) => {
  return prisma.tour.update({
    where: { id },
    data,
  });
};

export const deleteTour = async (id: string) => {
  return prisma.tour.update({
    where: { id },
    data: { isActive: false },
  });
};