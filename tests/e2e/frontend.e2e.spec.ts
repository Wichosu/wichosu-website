import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Wichosu/)

    const heading = page.locator('h1').first()
    await expect(heading).toContainText("Hi, I'm Wichosu")
  })

  test('returns a 404 for an unknown blog entry', async ({ page }) => {
    const response = await page.goto('/blog/does-not-exist')

    expect(response?.status()).toBe(404)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Page not found')
  })
})
