import express from 'express';
import {
  createReviewController,
  getReviewsByTourController,
  getReviewByIdController,
  updateReviewController,
  deleteReviewController,
} from '../controllers/reviewController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/reviews', auth, createReviewController);
router.get('/reviews/tour/:tourId', getReviewsByTourController);
router.get('/reviews/:id', getReviewByIdController);
router.put('/reviews/:id', auth, updateReviewController);
router.delete('/reviews/:id', auth, deleteReviewController);

export default router;