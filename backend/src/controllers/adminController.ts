import { Request, Response } from 'express';
import { getAllUsers, getUserById, updateUserStatus, deleteUser } from '../services/adminService';

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users.' });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user.' });
  }
};

export const updateUserStatusController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const updatedUser = await updateUserStatus(userId, status);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Error updating user status.' });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await deleteUser(userId);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user.' });
  }
};