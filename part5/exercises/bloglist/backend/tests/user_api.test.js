const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const helper = require('./test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

describe('When there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      name: 'Root',
      passwordHash,
    });

    await user.save();
  });

  describe('Creation succeeds with proper status code', () => {
    test('if using a fresh username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'secret',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });
  });

  describe('Creation fails with proper status code and message', () => {
    test('if username is already taken', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'secret',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'expected `username` to be unique'
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('if username is too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'u',
        name: 'Short name',
        password: 'secret',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'username: must be at least 3 characters long'
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('if password is too short', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'p',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain(
        'password: must be at least 3 characters long'
      );

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
