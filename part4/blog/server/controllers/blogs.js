const blogsRouter = require('express').Router();
const {
  tokenExtractor,
  userExtractor,
} = require('../utils/middleware');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    const body = req.body;

    const user = await User.findById(req.user.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  }
);

blogsRouter.patch(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    const blogToUpdate = await Blog.findById(req.params.id);
    const originalPosterId = blogToUpdate.user.toString();

    if (req.user.id !== originalPosterId) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const { title, author, url, likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    );

    res.json({ updated: updatedBlog });
  }
);

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res) => {
    const blogToDelete = await Blog.findById(req.params.id);
    const originalPosterId = blogToDelete.user.toString();

    if (req.user.id !== originalPosterId) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ deleted: blogToDelete });
  }
);

module.exports = blogsRouter;
