import express from 'express';
import { getUserProfile, updateUserProfileController, resetPasswordController } from '../controllers/userController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfileController);
router.post('/reset-password', auth, resetPasswordController);

export default router;