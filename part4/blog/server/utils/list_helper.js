const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const getTotalLikes = (blogs) => {
  const likes = blogs.reduce((sum, blog) => {
    return sum + blog?.likes;
  }, 0);

  return likes;
};

const getFavoriteBlog = (blogs) => {
  const favorite = blogs.reduce((mostLikes, current) =>
    mostLikes.likes > current.likes ? mostLikes : current
  );

  return favorite;
};

const getMostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const mostBlogs = _.reduce(groupedByAuthor, (leader, current) => {
    return leader?.length > current?.length ? leader : current;
  });

  return { author: mostBlogs[0]?.author, blogs: mostBlogs?.length };
};

const getMostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const mostLikes = _.reduce(groupedByAuthor, (leader, current) => {
    return getTotalLikes(leader) > getTotalLikes(current)
      ? leader
      : current;
  });

  return {
    author: mostLikes[0]?.author,
    likes: getTotalLikes(mostLikes),
  };
};

module.exports = {
  dummy,
  getTotalLikes,
  getFavoriteBlog,
  getMostLikes,
  getMostBlogs,
};
