export interface Review {
  id: string;
  content: string;
  rating: number;
  userId: string;
  tourId: string;
  createdAt: Date;
}