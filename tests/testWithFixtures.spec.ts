import { test } from "../test-options"
import { PageManager } from "../page-objects/pageManager"
import { faker } from "@faker-js/faker"


test('parametrized methods2', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(/ /g, '')}${faker.number.int(999)}@test.com`

    await pageManager.onFormLayoutPage().submitUsingTheGridFormUsingCredentialsAndSelectOption(process.env.USER, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndChackbox(randomFullName, randomEmail, false)
})

