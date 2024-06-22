export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  createdAt: Date;
  numberOfPeople: number;
}