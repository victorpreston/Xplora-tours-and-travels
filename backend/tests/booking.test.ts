import request from 'supertest';
import app from '../src/server';

let token: string;
let tourId: string;
let bookingId: string;

beforeAll(async () => {
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'newpassword123',
    });
  token = loginRes.body.token;

  const tourRes = await request(app)
    .post('/api/tours')
    .set('Authorization', `Bearer ${token}`)
    .send({
      destination: 'Nairobi',
      description: 'A beautiful tour of Nairobi',
      price: 100.0,
      tourType: 'City Tour',
      startDate: '2023-12-01T00:00:00.000Z',
      endDate: '2023-12-05T00:00:00.000Z',
    });
  tourId = tourRes.body.id;
});

describe('Booking API', () => {
  it('should create a new booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tourId,
        numberOfPeople: 2,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('tourId', tourId);
    bookingId = res.body.id;
  });

  it('should get bookings by user', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get booking by ID', async () => {
    const res = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', bookingId);
  });

  it('should cancel a booking', async () => {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Booking canceled successfully.');
  });
});