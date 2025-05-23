import { test } from "@playwright/test";

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test.describe('test suite 1', () => {
    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    })
    test('the 1st test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
        test('the 2nd test', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('test suite 2', () => {
    test.beforeEach(async({page}) => {
    await page.getByRole('link', { name: 'Charts', exact: true }).click()
    })
    test('the 3rd test', async ({page}) => {
        await page.getByText('Echarts').click()
    })
})