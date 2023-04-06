const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('When there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('API returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((b) => b.title);

    expect(titles).toContainEqual('TDD harms architecture');
  });

  test('Blog identification field is called "id"', async () => {
    const blogs = await helper.blogsInDb();

    expect(blogs[0].id).toBeDefined();
  });

  describe('Viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogs = await helper.blogsInDb();
      const blogToView = blogs[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(resultBlog.body).toEqual(blogToView);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId();

      await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/blogs/${invalidId}`).expect(400);
    });
  });

  describe('If user is logged in', () => {
    let loggedInUser;

    beforeAll(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('secret', 10);
      const user = new User({
        username: 'root',
        name: 'Root User',
        passwordHash,
      });

      await user.save();

      const result = await api
        .post('/api/login')
        .send({ username: user.username, password: 'secret' });

      loggedInUser = result.body;
    });

    describe('Addition of a new blog', () => {
      test('succeeds with valid data', async () => {
        const newBlog = {
          title: 'Test blog',
          author: 'Test author',
          url: 'Test url',
          likes: 25,
        };

        await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length + 1
        );

        const titles = blogsAtEnd.map((b) => b.title);
        expect(titles).toContainEqual('Test blog');
      });

      test('defaults likes to 0 if not defined', async () => {
        const newBlog = {
          title: 'No likes',
          author: 'Test author',
          url: 'Test url',
        };

        await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const testBlog = blogsAtEnd.find(
          (b) => b.title === 'No likes'
        );
        expect(testBlog.likes).toEqual(0);
      });

      test('fails with status code 400 if data is invalid', async () => {
        const noTitle = {
          author: 'Test author',
          url: 'Test url',
        };
        const noAuthor = {
          title: 'Test blog',
          url: 'Test url',
        };
        const noUrl = {
          title: 'Test blog',
          author: 'Test author',
        };

        await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(noTitle)
          .expect(400);
        await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(noAuthor)
          .expect(400);
        await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(noUrl)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      });
    });

    describe('Deletion of a blog', () => {
      test('succeeds with status code 204 if id and user is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const blogToDelete = {
          title: 'Will be deleted',
          author: 'Test author',
          url: 'Test url',
        };

        const postResponse = await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(blogToDelete);

        await api
          .delete(`/api/blogs/${postResponse.body.id}`)
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .expect(200);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

        const titles = blogsAtEnd.map((b) => b.title);

        expect(titles).not.toContain(blogToDelete.title);
      });
    });

    describe('Updating a blog', () => {
      test('succeeds with valid data', async () => {
        const blogToUpdate = {
          title: 'Will be updated',
          author: 'Test author',
          url: 'Test url',
        };

        const postResponse = await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(blogToUpdate);

        await api
          .patch(`/api/blogs/${postResponse.body.id}`)
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send({ likes: 100 })
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const updatedBlog = await Blog.findOne({
          title: 'Will be updated',
        });
        expect(updatedBlog.likes).toEqual(100);
      });

      test('fails with status code 400 if data is invalid', async () => {
        const blogToUpdate = {
          title: 'Will be updated',
          author: 'Test author',
          url: 'Test url',
        };

        const postResponse = await api
          .post('/api/blogs')
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(blogToUpdate);

        const invalidType = {
          likes: 'yes',
        };

        await api
          .patch(`/api/blogs/${postResponse.body.id}`)
          .set('Authorization', 'Bearer ' + loggedInUser.token)
          .send(invalidType)
          .expect(400);

        const updatedBlog = await Blog.findOne({
          title: 'Will be updated',
        });

        expect(updatedBlog.likes).toEqual(0);
      });
    });
  });

  describe('If no user is logged in, operation fails and returns status code 401 when', () => {
    test('trying to add a new blog', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test url',
        likes: 25,
      };

      await api.post('/api/blogs').send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test('trying to delete a blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    });

    test('trying to edit a blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      await api
        .patch(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 100 })
        .expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd[0].likes).toEqual(blogsAtStart[0].likes);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
