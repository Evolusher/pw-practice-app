import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { faker } from "@faker-js/faker"

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page', {
    tag: '@new'
    }, async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().DatepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods',
    {
    annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  }},
    async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(999)}@test.com`

    await pm.navigateTo().formLayoutPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormUsingCredentialsAndSelectOption(process.env.USER, process.env.PASSWORD, 'Option 2')
    //await page.screenshot({path: 'screenshots/formLayoutPage.png'})
    //const buffer = await page.screenshot() //create binary for screenshot

    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndChackbox(randomFullName, randomEmail, false)
    //await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().DatepickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5)
    await pm.onDatepickerPage().selectdatepickerWithRangeFromToday(6, 15)
})

