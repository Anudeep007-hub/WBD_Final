const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const app = require('./server'); // Adjust the path if necessary

console.log(typeof app); // Should log 'function' if it's an Express app
jest.setTimeout(30000); // Increase timeout globally for this file

const { TextEncoder, TextDecoder } = require('util');
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Models
const User = require('./models/UserSchema');
const Shop = require('./models/Shop');
const ShopOwner = require('./models/ShopOwner');
const Deal = require('./models/deal');
const Event = require('./models/Event');
const Manager = require('./models/manager');
const Feedback = require('./models/FeedBackSchema');

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'user'
};

const testShop = {
  name: 'Test Shop',
  location: 'Test Location',
  contact: '1234567890',
  workingHours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '9:00 AM - 5:00 PM',
    friday: '9:00 AM - 5:00 PM',
    saturday: '10:00 AM - 3:00 PM',
    sunday: 'Closed'
  },
  owner: {
    name: 'Shop Owner',
    email: 'owner@example.com',
    contact: '0987654321'
  }
};

const testShopOwner = {
  name: 'Test Shop Owner',
  email: 'shopowner@example.com',
  contact: '5555555555',
  password: 'shopowner123',
  shop: 'Test Shop'
};

const testManager = {
  name: 'Test Manager',
  email: 'manager@example.com',
  password: 'password123',
  section: 'sports'
};


let mongoServer;
let token;
let shopId;
let shopOwnerId;

// Setup MongoDB in-memory server
beforeAll(async () => {
  await mongoose.disconnect(); // Disconnect any existing connections
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up after tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
    // Clear all collections after each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });

// Clear test data before each test
beforeEach(async () => {
  await User.deleteMany({});
  await Shop.deleteMany({});
  await ShopOwner.deleteMany({});
  await Deal.deleteMany({});
  await Event.deleteMany({});
  await Manager.deleteMany({});
  await Feedback.deleteMany({});
});

describe('Authentication Endpoints', () => {
  test('Signup Testcase Passed: POST /api/signup should create a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send(testUser);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
    
    // Verify user was created in database
    const user = await User.findOne({ email: testUser.email });
    expect(user).toBeTruthy();
    expect(user.name).toBe(testUser.name);
    console.log('Signup Testcase Passed');
  });

  test('Login Testcase Passed: POST /api/login should authenticate a user and return token', async () => {
    // Create a user first
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hashedPassword
    });

    const res = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
    console.log('Login Testcase Passed');
  });

  test('Invalid Login Testcase Passed: POST /api/login should reject invalid credentials', async () => {
    // Create a user first
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hashedPassword
    });

    const res = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
    console.log('Invalid Login Testcase Passed');
  });
});

describe('Shop Endpoints', () => {
  beforeEach(async () => {
    // Create test shop
    const shop = await Shop.create(testShop);
    shopId = shop._id;
    
    // Create test shop owner
    const hashedPassword = await bcrypt.hash(testShopOwner.password, 10);
    const shopOwner = await ShopOwner.create({
      ...testShopOwner,
      password: hashedPassword
    });
    shopOwnerId = shopOwner._id;
    
    // Login to get admin token
    const adminRes = await request(app)
      .post('/api/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    
    token = adminRes.body.token;
  });

  test('Retrieve All Shops Testcase Passed: GET /api/shops should retrieve all shops', async () => {
    const res = await request(app).get('/api/shops');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe(testShop.name);
    console.log('Retrieve All Shops Testcase Passed');
  });

  test('Retrieve Specific Shop Testcase Passed: GET /api/a/shops/:id should retrieve a specific shop', async () => {
    const res = await request(app)
      .get(`/api/a/shops/${shopId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', testShop.name);
    expect(res.body).toHaveProperty('location', testShop.location);
    console.log('Retrieve Specific Shop Testcase Passed');
  });

  test('Update Shop Details Testcase Passed: PUT /api/a/shops/:id should update shop details', async () => {
    const updatedShop = {
      name: 'Updated Shop Name',
      location: 'Updated Location'
    };

    const res = await request(app)
      .put(`/api/a/shops/${shopId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedShop);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', updatedShop.name);
    expect(res.body).toHaveProperty('location', updatedShop.location);
    
    // Verify shop was updated in database
    const shop = await Shop.findById(shopId);
    expect(shop.name).toBe(updatedShop.name);
    console.log('Update Shop Details Testcase Passed');
  });

  test('Create New Shop Testcase Passed: POST /api/admin/shops should create a new shop', async () => {
    const newShop = {
      name: 'New Test Shop',
      location: 'New Location',
      contact: '9999999999',
      workingHours: {
        monday: '10:00 AM - 6:00 PM',
        tuesday: '10:00 AM - 6:00 PM',
        wednesday: '10:00 AM - 6:00 PM',
        thursday: '10:00 AM - 6:00 PM',
        friday: '10:00 AM - 6:00 PM',
        saturday: '11:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      owner: {
        name: 'New Owner',
        email: 'newowner@example.com',
        contact: '8888888888'
      }
    };

    const res = await request(app)
      .post('/api/admin/shops')
      .set('Authorization', `Bearer ${token}`)
      .send(newShop);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', newShop.name);
    
    // Verify shop was created in database
    const shop = await Shop.findOne({ name: newShop.name });
    expect(shop).toBeTruthy();
    console.log('Create New Shop Testcase Passed');
  });
});

describe('ShopOwner Endpoints', () => {
  beforeEach(async () => {
    // Create test shop owner
    const hashedPassword = await bcrypt.hash(testShopOwner.password, 10);
    const shopOwner = await ShopOwner.create({
      ...testShopOwner,
      password: hashedPassword
    });
    shopOwnerId = shopOwner._id;
  });

  test('POST /shopownerlogin should authenticate a shop owner', async () => {
    const res = await request(app)
      .post('/shopownerlogin')
      .send({
        email: testShopOwner.email,
        password: testShopOwner.password
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('message', 'Login successful');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('GET /api/shopowner/profile should retrieve shop owner profile', async () => {
    // Login first to set the email in backend variable x
    await request(app)
      .post('/shopownerlogin')
      .send({
        email: testShopOwner.email,
        password: testShopOwner.password
      });
    
    const res = await request(app)
      .get('/api/shopowner/profile');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', testShopOwner.name);
    expect(res.body).toHaveProperty('email', testShopOwner.email);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('PUT /api/shopowner/profile should update shop owner profile', async () => {
    // Login first to set the email in backend variable x
    await request(app)
      .post('/shopownerlogin')
      .send({
        email: testShopOwner.email,
        password: testShopOwner.password
      });
    
    const updatedProfile = {
      name: 'Updated Owner Name',
      contact: '1112223333'
    };
    
    const res = await request(app)
      .put('/api/shopowner/profile')
      .send(updatedProfile);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Profile updated successfully!');
    expect(res.body.shopOwner).toHaveProperty('name', updatedProfile.name);
    
    // Verify profile was updated in database
    const shopOwner = await ShopOwner.findById(shopOwnerId);
    expect(shopOwner.name).toBe(updatedProfile.name);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});

describe('Manager Endpoints', () => {
  test('POST /api/managers should create a new manager', async () => {
    // Login as admin first
    const adminRes = await request(app)
      .post('/api/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    
    token = adminRes.body.token;
    
    const res = await request(app)
      .post('/api/managers')
      .set('Authorization', `Bearer ${token}`)
      .send(testManager);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Manager created successfully and email sent!');
    
    // Verify manager was created in database
    const manager = await Manager.findOne({ email: testManager.email });
    expect(manager).toBeTruthy();
    expect(manager.name).toBe(testManager.name);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('POST /api/manager-login should authenticate a manager', async () => {
    // Create manager first
    const hashedPassword = await bcrypt.hash(testManager.password, 10);
    await Manager.create({
      ...testManager,
      password: hashedPassword
    });

    const res = await request(app)
      .post('/api/manager-login')
      .send({
        email: testManager.email,
        password: testManager.password
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});

describe('Deal Endpoints', () => {
  let dealId;
  
  beforeEach(async () => {
    // Create a test deal
    const deal = await Deal.create({
      shop: 'Test Shop',
      description: 'Test Deal Description',
      expiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });
    dealId = deal._id;
    
    // Login as admin
    const adminRes = await request(app)
      .post('/api/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    
    token = adminRes.body.token;
  });

  test('GET /api/deals should retrieve all deals', async () => {
    const res = await request(app).get('/api/deals');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].shop).toBe('Test Shop');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('POST /api/add-deal should create a new deal', async () => {
    const newDeal = {
      shop: 'Another Shop',
      description: 'New Deal Description',
      expiration: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    };

    const res = await request(app)
      .post('/api/add-deal')
      .set('Authorization', `Bearer ${token}`)
      .send(newDeal);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Deal added successfully!');
    expect(res.body.deal).toHaveProperty('shop', newDeal.shop);
    
    // Verify deal was created in database
    const deal = await Deal.findOne({ shop: newDeal.shop });
    expect(deal).toBeTruthy();
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('PUT /api/deals/:id should update a deal', async () => {
    const updatedDeal = {
      store: 'Updated Shop',
      description: 'Updated Deal Description',
      expiration: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
    };

    const res = await request(app)
      .put(`/api/deals/${dealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedDeal);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('store', updatedDeal.store);
    expect(res.body).toHaveProperty('description', updatedDeal.description);
    
    // Verify deal was updated in database
    const deal = await Deal.findById(dealId);
    expect(deal.store).toBe(updatedDeal.store);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});

describe('Feedback Endpoints', () => {
  test('POST /api/feedback should create a new feedback', async () => {
    const testFeedback = {
      username: 'Test User',
      rating: 4,
      message: 'This is a test feedback message'
    };

    const res = await request(app)
      .post('/api/feedback')
      .send(testFeedback);
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Feedback submitted successfully');
    
    // Verify feedback was created in database
    const feedback = await Feedback.findOne({ username: testFeedback.username });
    expect(feedback).toBeTruthy();
    expect(feedback.rating).toBe(testFeedback.rating);
    expect(feedback.message).toBe(testFeedback.message);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('GET /api/feedback should retrieve all feedback', async () => {
    // Create test feedback records
    await Feedback.create([
      {
        username: 'User 1',
        rating: 5,
        message: 'Excellent service'
      },
      {
        username: 'User 2',
        rating: 3,
        message: 'Average experience'
      }
    ]);

    const res = await request(app).get('/api/feedback');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});



describe('Stats Endpoint', () => {
  beforeEach(async () => {
    // Create test data for stats
    await User.create([
      { 
        name: 'User 1', 
        email: 'user1@example.com', 
        password: await bcrypt.hash('password', 10) 
      },
      { 
        name: 'User 2', 
        email: 'user2@example.com', 
        password: await bcrypt.hash('password', 10) 
      }
    ]);
    
    await ShopOwner.create([
      {
        name: 'Owner 1',
        email: 'owner1@example.com',
        password: await bcrypt.hash('password', 10),
        contact: '1111111111',
        shop: 'Shop 1'
      }
    ]);
    
    await Shop.create([
      {
        name: 'Shop 1',
        location: 'Location 1',
        contact: '1111111111'
      },
      {
        name: 'Shop 2',
        location: 'Location 2',
        contact: '2222222222'
      }
    ]);
  });
  
  test('GET /stats should return correct counts', async () => {
    // Login as admin
    const adminRes = await request(app)
      .post('/api/login')
      .send({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
    
    token = adminRes.body.token;
    
    const res = await request(app)
      .get('/stats')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usersCount', 2);
    expect(res.body).toHaveProperty('shopOwnersCount', 1);
    expect(res.body).toHaveProperty('shopsCount', 2);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});

describe('Protected Routes', () => {
  test('GET /api/protected-route should require authorization', async () => {
    const res = await request(app).get('/api/protected-route');
    
    expect(res.statusCode).toBe(401);
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('GET /api/protected-route should allow access with valid token', async () => {
    // Create and login a user
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    const user = await User.create({
      ...testUser,
      password: hashedPassword
    });
    
    const loginRes = await request(app)
      .post('/api/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    
    token = loginRes.body.token;
    
    const res = await request(app)
      .get('/api/protected-route')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'You have access to this protected route!');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});

describe('Error Handling', () => {
  test('GET /notfound should return 404 status', async () => {
    const res = await request(app).get('/notfound');
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Resource not found');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });

  test('GET /error should return 500 status', async () => {
    const res = await request(app).get('/error');
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Internal Server Error');
    console.log('Test case passed successfully'); // Added to log success for each test case
  });
});