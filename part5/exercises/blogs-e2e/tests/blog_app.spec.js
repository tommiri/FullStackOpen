const { test, expect } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testing'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = page.getByRole('heading', { name: 'Log in to application' })
    const usernameField = page.getByRole('textbox', { name: 'Username' })
    const passwordField = page.getByRole('textbox', { name: 'Password' })
    const loginButton = page.getByRole('button', { name: 'LOGIN' })

    await expect(loginText).toBeVisible()
    await expect(usernameField).toBeVisible()
    await expect(passwordField).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'incorrect')
      await expect(page.getByText('Error: incorrect credentials')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'blogs' })).not.toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'testurl.com')
      await expect(page.getByText('New blog added: "Test Title" by Test Author')).toBeVisible()
      await expect(page.locator('li').filter({ hasText: 'Test Title by Test Author' })).toBeVisible()
    })

    test.describe('with blogs already created', () => {
      let firstBlog // Initialize firstBlog here to avoid repetition

      test.beforeEach(async ({ page }) => {
        await createBlog(page, 'Blog1', 'Author1', 'url1.com')
        await createBlog(page, 'Blog2', 'Author2', 'url2.com')
        firstBlog = page.getByRole('listitem').filter({ hasText: 'Blog1' })
      })

      test('blogs can be liked', async ({ page }) => {
        await firstBlog.getByRole('button', { name: 'show' }).click()
        await firstBlog.getByRole('button', { name: 'like' }).click()
        await expect(firstBlog).toContainText('Likes: 1')
        await firstBlog.getByRole('button', { name: 'like' }).click()
        await expect(firstBlog).toContainText('Likes: 2')
      })

      test('blogs can be deleted by the user who created them', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept()) // Auto-accept dialog when deleting blog

        await firstBlog.getByRole('button', { name: 'show' }).click()
        await firstBlog.getByRole('button', { name: 'delete' }).click()
        await expect(firstBlog).toHaveCount(0) // Ensure element has been deleted
      })

      test("users cannot see the delete button on blogs they didn't create", async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'testuser', 'testing')

        await firstBlog.getByRole('button', { name: 'show' }).click()
        await expect(firstBlog.getByRole('button', { name: 'delete' })).toHaveCount(0)
      })

      test('blogs are sorted in descending order by like count', async ({ page }) => {
        const secondBlog = page.getByRole('listitem').filter({ hasText: 'Blog2' })
        
        // Verify initial order of blogs
        let blogItems = await page.getByRole('listitem').all()
        await expect(blogItems[0]).toContainText('Blog1')
        await expect(blogItems[1]).toContainText('Blog2')

        await firstBlog.getByRole('button', { name: 'show' }).click()
        await likeBlog(firstBlog, 1) // Like Blog1 once

        await secondBlog.getByRole('button', { name: 'show' }).click()
        await likeBlog(secondBlog, 2) // Like Blog 2 twice
        
        // Verify order has changed and blogs are sorted by likes
        blogItems = await page.getByRole('listitem').all()
        await expect(blogItems[0]).toContainText('Blog2')
        await expect(blogItems[1]).toContainText('Blog1')
      })
    })
})

})