import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/userInterface';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { userId },
  });
};

export const updateUserStatus = async (userId: string, status: string) => {
  return prisma.user.update({
    where: { userId },
    data: { accountStatus: status },
  });
};

export const deleteUser = async (userId: string) => {
  return prisma.user.delete({
    where: { userId },
  });
};