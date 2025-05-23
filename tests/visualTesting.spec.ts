import { test, expect } from "@playwright/test";

test('radiobuttons visual testing', async({page}) => {

await page.goto('/')
await page.getByText('Forms').click()
await page.getByText('Form Layouts').click()
const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"}) 
await usingTheGridForm.getByRole('radio', {name:'Option 2'}).check({force: true})
const radioStatus = await usingTheGridForm.getByRole('radio', {name:'Option 1'}).isChecked()
await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})

})