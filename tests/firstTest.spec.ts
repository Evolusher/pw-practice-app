import { test, expect } from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locator syntax rules', async ({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail')

    //by Class
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine attributes
    page.locator('input[placeholder="Email"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator('text-is:("Using the grid")')


})

test('user facing locators', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name:"Sign In"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the grid').click()
    await page.getByTestId('SignIn').click()
    await page.getByTitle('Iot Dashboard').click()

})

test ('locating child element', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
})

test('using parent elememt', async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({hasText:"Basic Form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
})

test('reusing the locators', async ({page}) => {
    const basicForm = page.locator('nb-card', {hasText: "Basic Form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')

})

test('extracring values', async ({page}) => {
    //single test value
    const basicForm = page.locator('nb-card', {hasText: "Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect (buttonText).toEqual('Submit')

    //extract all values
    const UsingTheGrid = page.locator('nb-card', {hasText: "Using the Grid"})
    const allRadioButtonsLabels = await UsingTheGrid.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')
    //expect(emailField).toHaveValue('test@test.com')

    //attribute value
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) => {
    //general assertion
    const basicFormButton = page.locator('nb-card', {hasText: "Basic Form"}).locator('button')
    const text  = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})