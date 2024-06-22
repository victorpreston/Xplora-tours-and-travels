import { Request, Response } from 'express';
import { createReview, getReviewsByTour, getReviewById, updateReview, deleteReview } from '../services/reviewService';
import { Review } from '../interfaces/reviewInterface';

export const createReviewController = async (req: Request, res: Response) => {
  const reviewData: Review = req.body;

  try {
    const review = await createReview(reviewData);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Error creating review.' });
  }
};

export const getReviewsByTourController = async (req: Request, res: Response) => {
  const { tourId } = req.params;

  try {
    const reviews = await getReviewsByTour(tourId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching reviews.' });
  }
};

export const getReviewByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const review = await getReviewById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching review.' });
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reviewData: Partial<Review> = req.body;

  try {
    const updatedReview = await updateReview(id, reviewData);
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: 'Error updating review.' });
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteReview(id);
    res.json({ message: 'Review deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting review.' });
  }
};