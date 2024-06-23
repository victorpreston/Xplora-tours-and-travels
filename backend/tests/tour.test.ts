import request from 'supertest';
import app from '../src/server';

let token: string;
let tourId: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'adminpassword123',
    });
  token = res.body.token;
});

describe('Tour API', () => {
  it('should create a new tour', async () => {
    const res = await request(app)
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
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('destination', 'Nairobi');
    tourId = res.body.id;
  });

  it('should get all tours', async () => {
    const res = await request(app).get('/api/tours');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a tour by ID', async () => {
    const res = await request(app).get(`/api/tours/${tourId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', tourId);
  });

  it('should update a tour', async () => {
    const res = await request(app)
      .put(`/api/tours/${tourId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        destination: 'Updated Nairobi',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('destination', 'Updated Nairobi');
  });

  it('should soft delete a tour', async () => {
    const res = await request(app)
      .delete(`/api/tours/${tourId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isActive', false);
  });
});