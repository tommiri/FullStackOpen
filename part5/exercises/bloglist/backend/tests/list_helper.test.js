const {
  dummy,
  getTotalLikes,
  getFavoriteBlog,
  getMostLikes,
  getMostBlogs,
} = require('../utils/list_helper');
const { initialBlogs } = require('./test_helper');

test('Dummy returns one', () => {
  const result = dummy([]);
  expect(result).toBe(1);
});

describe('Total likes', () => {
  test('of empty list is zero', () => {
    expect(getTotalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    expect(getTotalLikes([initialBlogs[0]])).toBe(7);
  });

  test('of a bigger list is calculated right', () => {
    expect(getTotalLikes(initialBlogs)).toBe(36);
  });
});

describe('Favourite blog is', () => {
  test('equal to the one with the most likes', () => {
    expect(getFavoriteBlog(initialBlogs)).toEqual(initialBlogs[2]);
  });
});

describe('getMostBlogs', () => {
  test('returns the name and amount of blogs of the author with the most blogs', () => {
    expect(getMostBlogs(initialBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('getMostLikes', () => {
  test('returns the name and amount of likes of the author with the most likes', () => {
    expect(getMostLikes(initialBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
