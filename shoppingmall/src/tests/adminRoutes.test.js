const request = require('supertest');
const app = require('../app'); // Your Express app
const mongoose = require('mongoose');
const Manager = require('../models/Manager'); // Your Mongoose model
const Shop = require('../models/Shop');

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://saikiransuguru:7eYEmWV5Nmzrn24m@cluster0.sbi4o.mongodb.net/shoppingmall?retryWrites=true&w=majority&appName=Cluster0');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Admin Routes', () => {
  test('GET /api/admin/dashboard should return a welcome message', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Welcome to the Admin Dashboard');
  });

  test('POST /api/managers should create a manager and send email', async () => {
    const res = await request(app)
      .post('/api/managers')
      .send({
        name: 'Test Manager',
        email: 'manager@example.com',
        section: 'A1',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
    const manager = await Manager.findOne({ email: 'manager@example.com' });
    expect(manager).not.toBeNull();
  });

  test('GET /api/a/shops should return a list of shops', async () => {
    const res = await request(app).get('/api/a/shops');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/admin/shops should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/admin/shops')
      .send({ name: 'ShopX', location: 'LocY' }); // missing required fields
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
