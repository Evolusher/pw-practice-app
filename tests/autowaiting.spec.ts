import { test, expect } from "@playwright/test";
import { timeout } from "rxjs-compat/operator/timeout";

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)

})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    // await successButton.waitFor({state: 'attached'})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 17000 })


})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    //wait for element
    //await page.waitForSelector('.bg-success')

    //wait for response
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network idle (NOT RECOMMENDED)


    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('timeout', async ({ page }) => {
    //test.setTimeout(10000)
    //test.slow()

    const successButton = page.locator('.bg-success')
    await successButton.click()
})