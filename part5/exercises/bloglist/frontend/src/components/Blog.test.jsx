import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('<Blog />', () => {
  let updateMock; // Init updateMock in outer scope so it can be called inside tests

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'test author',
      url: 'testurl.com',
      likes: '99',
      user: {
        username: 'testuser',
        name: 'Test User',
        blogs: [],
        id: '1234',
      },
    };

    updateMock = vi.fn();

    render(<Blog blog={blog} updateBlog={updateMock} />);
  });

  test('only displays title and author when not expanded', () => {
    const titleAndAuthor = screen.getByText('test blog by test author');
    const url = screen.getByText('testurl.com', { exact: false });
    const likes = screen.getByText('Likes: 99', { exact: false });

    expect(titleAndAuthor).toBeVisible;
    expect(url).not.toBeVisible;
    expect(likes).not.toBeVisible;
  });

  test('displays url, likes and user when expanded', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const url = screen.getByText('testurl.com', { exact: false });
    const likes = screen.getByText('Likes: 99', { exact: false });
    const username = screen.getByText('Test User', { exact: false });

    expect(url).toBeVisible;
    expect(likes).toBeVisible;
    expect(username).toBeVisible;
  });

  test('like button click event is handled correctly', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');

    // Click button twice
    for (let i = 0; i < 2; i++) {
      await user.click(button);
    }

    expect(updateMock.mock.calls).toHaveLength(2);
  });
});
