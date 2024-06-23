import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/userInterface';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  console.log('Fetching profile for userId:', userId); // Debugging line

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err); // Debugging line
    res.status(500).json({ error: 'Server error.' });
  }
};

// Update user profile
export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  console.log('Updating profile for userId:', userId); // Debugging line
  const { firstname, lastname, email, password }: User = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user profile:', err); // Debugging line
    res.status(400).json({ error: 'Email already in use or other validation error.' });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  console.log('Resetting password for userId:', userId); // Debugging line
  const { newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        password: hashedPassword,
      },
    });
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error resetting password:', err); // Debugging line
    res.status(500).json({ error: 'Server error.' });
  }
};