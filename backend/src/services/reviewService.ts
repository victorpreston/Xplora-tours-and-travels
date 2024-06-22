import { PrismaClient } from '@prisma/client';
import { Review } from '../interfaces/reviewInterface';

const prisma = new PrismaClient();

export const createReview = async (data: Review) => {
  return prisma.review.create({
    data,
  });
};

export const getReviewsByTour = async (tourId: string) => {
  return prisma.review.findMany({
    where: { tourId },
  });
};

export const getReviewById = async (id: string) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

export const updateReview = async (id: string, data: Partial<Review>) => {
  return prisma.review.update({
    where: { id },
    data,
  });
};

export const deleteReview = async (id: string) => {
  return prisma.review.delete({
    where: { id },
  });
};