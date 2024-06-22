import express from 'express';
import {
  createTourController,
  getAllToursController,
  getTourByIdController,
  updateTourController,
  deleteTourController,
} from '../controllers/tourController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/tours', auth, createTourController);
router.get('/tours', getAllToursController);
router.get('/tours/:id', getTourByIdController);
router.put('/tours/:id', auth, updateTourController);
router.delete('/tours/:id', auth, deleteTourController);

export default router;