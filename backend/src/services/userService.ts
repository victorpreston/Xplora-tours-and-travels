import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { User, UserCredentials } from '../interfaces/userInterface';

const prisma = new PrismaClient();

export const createUser = async (data: User) => {
  const { firstname, lastname, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { userId },
  });
};

export const updateUserProfile = async (userId: string, data: Partial<User>) => {
  const { firstname, lastname, email, password } = data;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  const updatedUser = await prisma.user.update({
    where: { userId },
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    },
  });

  return updatedUser;
};

export const resetPassword = async (userId: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { userId },
    data: {
      password: hashedPassword,
    },
  });

  return updatedUser;
};