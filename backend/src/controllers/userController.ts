import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, findUserById, updateUserProfile, resetPassword } from '../services/userService';
import { User, UserCredentials } from '../interfaces/userInterface';

// Log the JWT_SECRET value
console.log('JWT_SECRET in userController:', process.env.JWT_SECRET);

export const register = async (req: Request, res: Response) => {
  const userData: User = req.body;

  try {
    const user = await createUser(userData);

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during registration:', err);
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
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = user.userId;

  try {
    const userProfile = await findUserById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(userProfile);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

export const updateUserProfileController = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = user.userId;
  const userData: Partial<User> = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, userData);
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(400).json({ error: 'Email already in use or other validation error.' });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = user.userId;
  const { newPassword } = req.body;

  try {
    const updatedUser = await resetPassword(userId, newPassword);
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};