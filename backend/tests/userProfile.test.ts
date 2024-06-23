import request from 'supertest';
import app from '../src/server';

let token: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'password123',
    });
  token = res.body.token;
});

describe('User Profile API', () => {
  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstname: 'Updated',
        lastname: 'User',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('firstname', 'Updated');
  });

  it('should reset user password', async () => {
    const res = await request(app)
      .post('/api/user/reset-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        newPassword: 'newpassword123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Password updated successfully.');
  });
});