import { expect, test, type Page } from '@playwright/test';

const projectRoutes = [
  ['bookverse', 'BookVerse'],
  ['easy-buy', 'Easy-Buy'],
  ['swiftchat', 'SwiftChat'],
  ['masa2o-ta7ady', 'Masa2o-Ta7ady'],
  ['heimdall', 'Heimdall'],
] as const;

async function openNavigation(page: Page) {
  const menu = page.getByRole('button', { name: 'Menu' });
  if (await menu.isVisible()) await menu.click();
  return page.getByRole('navigation', { name: 'Main navigation' });
}

test('homepage renders its main content', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { name: 'Abdelrahman Mosad.', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projects', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV', exact: true })).toHaveAttribute('href', '/Abdelrahman-Mosad-CV.pdf');
});

for (const [slug, name] of projectRoutes) {
  test(`${name} detail route renders its content`, async ({ page }) => {
    const response = await page.goto(`/projects/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name, exact: true, level: 1 })).toBeVisible();
    for (const heading of ['Overview', 'Architecture', 'What the project covers', 'Source code']) {
      await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    }
    await expect(page.getByRole('link', { name: 'All projects' })).toHaveAttribute('href', '/#projects');
  });
}

test('navigation reaches each homepage section and project pages link back', async ({ page }) => {
  await page.goto('/');
  for (const [name, id] of [
    ['About', 'about'], ['Experience', 'experience'], ['Education', 'education'],
    ['Projects', 'projects'], ['Contact', 'contact'], ['Home', 'home'],
  ]) {
    const nav = await openNavigation(page);
    await nav.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    const menu = page.getByRole('button', { name: 'Menu' });
    if (await menu.isVisible()) await expect(menu).toHaveAttribute('aria-expanded', 'false');
  }
  await page.getByRole('link', { name: 'View projects', exact: true }).click();
  await expect(page).toHaveURL(/\/#projects$/);
  for (const [slug, name] of projectRoutes) {
    await page.getByRole('link', { name: `Explore ${name}`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${slug}/$`));
    await page.getByRole('link', { name: 'All projects' }).click();
    await expect(page).toHaveURL(/\/#projects$/);
  }
  await page.goto('/projects/bookverse/');
  const nav = await openNavigation(page);
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.getByRole('heading', { name: 'Get in touch.' })).toBeInViewport();
});

test('mobile navigation closes with Escape and returns focus', async ({ page }) => {
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  test.skip(!(await menu.isVisible()), 'Only the mobile viewport has a collapsible menu.');
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('theme changes visually and persists through reload and route navigation', async ({ page }) => {
  await page.goto('/');
  const darkBackground = await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor);
  await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
  const darkToggle = page.getByRole('button', { name: 'Switch to dark theme', exact: true });
  await expect(darkToggle).toHaveAttribute('aria-pressed', 'false');
  const lightBackground = await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor);
  expect(lightBackground).not.toBe(darkBackground);
  await page.reload();
  await expect(darkToggle).toBeVisible();
  await page.getByRole('link', { name: 'Explore BookVerse', exact: true }).click();
  await expect(darkToggle).toBeVisible();
  await darkToggle.click();
  await expect(page.getByRole('button', { name: 'Switch to light theme', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Switch to light theme', exact: true })).toBeVisible();
  expect(await page.locator('body').evaluate(element => getComputedStyle(element).backgroundColor)).toBe(darkBackground);
});

test('gallery advances to the last project and can return to the beginning', async ({ page }) => {
  await page.goto('/#projects');
  const previous = page.getByRole('button', { name: 'Previous projects' });
  const next = page.getByRole('button', { name: 'Next projects' });
  const first = page.getByRole('link', { name: 'Explore BookVerse', exact: true });
  await expect(previous).toBeDisabled();
  const initialX = (await first.boundingBox())!.x;
  await next.click();
  await expect(previous).toBeEnabled();
  await expect.poll(async () => (await first.boundingBox())!.x).toBeLessThan(initialX);
  // A bounded number of user clicks reaches the end without depending on card widths.
  for (let i = 0; i < 5 && await next.isEnabled(); i++) {
    const before = (await first.boundingBox())!.x;
    await next.click();
    await expect.poll(async () => (await first.boundingBox())!.x).toBeLessThan(before);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
  await expect(next).toBeDisabled();
  const last = page.getByRole('link', { name: 'Explore Heimdall', exact: true });
  const gallery = page.getByRole('region', { name: 'Project gallery' });
  const lastBox = (await last.boundingBox())!;
  const galleryBox = (await gallery.boundingBox())!;
  expect(lastBox.x + lastBox.width).toBeLessThanOrEqual(galleryBox.x + galleryBox.width + 1);
  for (let i = 0; i < 5 && await previous.isEnabled(); i++) {
    const before = (await first.boundingBox())!.x;
    await previous.click();
    await expect.poll(async () => (await first.boundingBox())!.x).toBeGreaterThan(before);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();
});

test('copy email copies the displayed address and announces success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Email copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('bodymosad67@gmail.com');
});

test('copy email falls back when the Clipboard API is denied', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  // Clipboard permission failure is an external browser boundary, not an app mock.
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async () => { throw new DOMException('Permission denied', 'NotAllowedError'); },
    });
  });
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Email copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('bodymosad67@gmail.com');
});

test('copy email failure offers the address for manual copying', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async () => { throw new DOMException('Permission denied', 'NotAllowedError'); },
    });
    // Simulate a browser without a usable legacy clipboard command as well.
    document.execCommand = () => false;
  });
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status')).toHaveText('Copy unavailable. Select and copy the email address.');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('bodymosad67@gmail.com');
  await expect(page.getByRole('link', { name: 'bodymosad67@gmail.com' })).toHaveAttribute('href', 'mailto:bodymosad67@gmail.com');
});
