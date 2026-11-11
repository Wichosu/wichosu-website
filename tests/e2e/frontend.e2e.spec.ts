import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Wichosu/)

    const heading = page.locator('h1').first()
    await expect(heading).toContainText("Hi, I'm Wichosu")
  })

  test('exposes every destination in the primary navigation', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Primary' })

    await expect(nav.getByRole('link', { name: 'Writing' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Book reviews' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Ko-fi' })).toBeVisible()
  })

  test('navigates to the writing archive and marks it current', async ({ page }) => {
    await page.goto('/')

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Writing' })
      .click()

    await expect(page).toHaveURL(/\/blog$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Writing' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Writing' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('navigates to the book reviews archive and marks it current', async ({ page }) => {
    await page.goto('/')

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Book reviews' })
      .click()

    await expect(page).toHaveURL(/\/book-review$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Book reviews' })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Book reviews' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  test('keeps the navigation in the bar and the page inside the viewport on mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Primary' })
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible()

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test('returns a 404 for an unknown blog entry', async ({ page }) => {
    const response = await page.goto('/blog/does-not-exist')

    expect(response?.status()).toBe(404)

    const heading = page.locator('h1').first()
    await expect(heading).toHaveText('Page not found')
  })

  test('renders the designed 404 for an unmatched root-level URL', async ({ page }) => {
    const response = await page.goto('/does-not-exist')

    expect(response?.status()).toBe(404)

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found')
    await expect(page.getByRole('link', { name: 'Go home' })).toBeVisible()
  })
})
