export interface Tour {
  id: string;
  destination: string;
  description?: string;
  price: number;
  tourType: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  createdAt: Date;
  numberOfPeople: number;
}