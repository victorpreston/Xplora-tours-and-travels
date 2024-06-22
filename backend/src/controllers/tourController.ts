import { Request, Response } from 'express';
import { createTour, getAllTours, getTourById, updateTour, deleteTour } from '../services/tourService';
import { Tour } from '../interfaces/tourInterface';

export const createTourController = async (req: Request, res: Response) => {
  const tourData: Tour = req.body;

  try {
    const tour = await createTour(tourData);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ error: 'Error creating tour.' });
  }
};

export const getAllToursController = async (req: Request, res: Response) => {
  try {
    const tours = await getAllTours();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tours.' });
  }
};

export const getTourByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tour = await getTourById(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found.' });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tour.' });
  }
};

export const updateTourController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tourData: Partial<Tour> = req.body;

  try {
    const updatedTour = await updateTour(id, tourData);
    res.json(updatedTour);
  } catch (err) {
    res.status(400).json({ error: 'Error updating tour.' });
  }
};

export const deleteTourController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTour = await deleteTour(id);
    res.json(deletedTour);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting tour.' });
  }
};