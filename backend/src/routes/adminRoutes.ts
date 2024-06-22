import express from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  updateUserStatusController,
  deleteUserController,
} from '../controllers/adminController';
import auth from '../middlewares/auth';
import adminOnly from '../middlewares/roleMiddleware';

const router = express.Router();

router.get('/admin/users', auth, adminOnly, getAllUsersController);
router.get('/admin/users/:userId', auth, adminOnly, getUserByIdController);
router.put('/admin/users/:userId/status', auth, adminOnly, updateUserStatusController);
router.delete('/admin/users/:userId', auth, adminOnly, deleteUserController);

export default router;