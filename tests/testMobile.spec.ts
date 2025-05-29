import test, { expect } from "@playwright/test"
import { argosScreenshot } from "@argos-ci/playwright";

test('input fields', async ({ page }, testInfo) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await argosScreenshot(page, "empty form");
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')
    await argosScreenshot(page, "entered email");
})