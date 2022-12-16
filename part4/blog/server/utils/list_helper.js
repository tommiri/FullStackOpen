const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return likes;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  return favorite;
};

const mostLikes = (blogs) => {};

const mostBlogs = (blogs) => {};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
