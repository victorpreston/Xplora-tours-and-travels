import express from 'express';
import {
  createTourController,
  getAllToursController,
  getTourByIdController,
  updateTourController,
  deleteTourController,
} from '../controllers/tourController';
import auth from '../middlewares/auth';
import adminOnly from '../middlewares/roleMiddleware';

const router = express.Router();

router.post('/tours', auth, adminOnly, createTourController);
router.get('/tours', getAllToursController);
router.get('/tours/:id', getTourByIdController);
router.put('/tours/:id', auth, adminOnly, updateTourController);
router.delete('/tours/:id', auth, adminOnly, deleteTourController);

export default router;