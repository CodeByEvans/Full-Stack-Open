const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require ('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'hola',
        name: 'hola',
        password: 'hola'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'otro',
        name: 'otro',
        password: 'otro'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeds with correct credentials', async({ page }) => {
      await loginWith(page, 'hola', 'hola')
  
      await expect(page.getByText('blogs')).toBeVisible()
    })

    test('fails with wrong credentials', async({page}) => {
      await loginWith(page, 'hola', 'wrong')

      const notification = await page.locator('.notification')
      await expect(notification).toContainText('Wrong credentials')
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'hola', 'hola')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'New Title', 'New Author', 'New Url')
      
      await expect(page.getByText('New Title by New Author')).toBeVisible()
    })

     describe('When new blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'New Title 1', 'New Author', 'New Url')
      })

      test('a blog can be edited', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByText('Likes: 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('can delete own blog', async ({page}) => {
        const blogToDelete = page.getByText('New Title by New Author')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button',{name: 'remove'})).toBeVisible()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(blogToDelete).not.toBeVisible()
      })

      test('cannot delete blog of other user', async ({ page }) => {
        await page.getByRole('button', {name: 'logout'}).click()
        await loginWith(page, 'otro', 'otro')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
      })

      test('Check that the blogs are sorted by likes', async ({ page }) => {
        await createBlog(page, 'New Title 2', 'New Author','New Url')

        const firstBlogCreated = await page.getByText('New Title 1 by New Author')
        const locatorFirst = await firstBlogCreated.locator('..')
        await locatorFirst.getByRole('button', {name:'view'}).click()

        const secondBlogCreated = await page.getByText('New Title 2 by New Author')
        const locatorSecond = await secondBlogCreated.locator('..')
        await locatorSecond.getByRole('button', {name:'view'}).click()

        await locatorSecond.getByRole('button', {name:'like'}).click()
        const listBlogs = await page.getByTestId('blog card')
        const firstBlog = await listBlogs.nth(0).getByText('New Title 2 by New Author')
        await expect(firstBlog).toBeVisible()

      })
    })
  })
})