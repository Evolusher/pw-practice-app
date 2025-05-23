import { test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions = {
    globalsQAUrl: string
    formLayoutPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQAUrl: ['', {option: true}],
    //adding as fixture to the specific test required if it not called in the another fixture
    formLayoutPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        //teardown
        console.log('Teardown')
    },
    
    //adding as fixtures that called automatically without adding to the specific suite or test
    // formLayoutPage: [async({page}, use) => {
    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    //     await use('')
    // }, {auto: true} ]   

    pageManager: async({page, formLayoutPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})

