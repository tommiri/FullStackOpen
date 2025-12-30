const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'LOGIN' }).click();
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click();
  await page.getByRole('textbox', { name: 'title:' }).fill(title);
  await page.getByRole('textbox', { name: 'author:' }).fill(author);
  await page.getByRole('textbox', { name: 'url:' }).fill(url);
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByText(`${title} by ${author}`).waitFor()
}

const likeBlog = async (locator, count) => {
  for (let i = 0; i < count; i++) {
    await locator.getByRole('button', { name: 'like' }).click()
    await locator.getByText(`Likes: ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, likeBlog }