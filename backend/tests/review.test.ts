import request from 'supertest';
import app from '../src/server';

let token: string;
let tourId: string;
let reviewId: string;

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

describe('Review API', () => {
  it('should create a new review', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Great tour!',
        rating: 5,
        tourId,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('content', 'Great tour!');
    reviewId = res.body.id;
  });

  it('should get reviews by tour', async () => {
    const res = await request(app).get(`/api/reviews/tour/${tourId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get review by ID', async () => {
    const res = await request(app).get(`/api/reviews/${reviewId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', reviewId);
  });

  it('should update a review', async () => {
    const res = await request(app)
      .put(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Updated review',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('content', 'Updated review');
  });

  it('should delete a review', async () => {
    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Review deleted successfully.');
  });
});