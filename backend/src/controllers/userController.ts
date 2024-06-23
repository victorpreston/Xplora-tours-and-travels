import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserById, updateUserProfile, resetPassword } from '../services/userService';
import { User, UserCredentials } from '../interfaces/userInterface';

interface AuthRequest extends Request {
  user?: any;
}

export const register = async (req: Request, res: Response) => {
  const userData: User = req.body;

  try {
    const user = await createUser(userData);

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: UserCredentials = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.user.userId;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateUserProfileController = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.user.userId;
  const userData: Partial<User> = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, userData);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Email already in use or other validation error.' });
  }
};

export const resetPasswordController = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = req.user.userId;
  const { newPassword } = req.body;

  try {
    const updatedUser = await resetPassword(userId, newPassword);
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};