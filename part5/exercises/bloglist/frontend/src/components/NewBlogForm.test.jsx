import { render, screen } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';
import { expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

test('<NewBlogForm /> calls onSubmit function with correct data', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<NewBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('Title');
  const authorInput = screen.getByPlaceholderText('Author');
  const urlInput = screen.getByPlaceholderText('URL');
  const submitButton = screen.getByText('create');

  await user.type(titleInput, 'test title');
  await user.type(authorInput, 'test author');
  await user.type(urlInput, 'testurl.com');
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'testurl.com',
  });
});
