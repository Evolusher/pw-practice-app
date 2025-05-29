import { Locator, Page } from "@playwright/test";

/*export*/ class NavigationPage {

    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datepickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datepickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')


    }
    async formLayoutPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }

    async DatepickerPage() {
        await this.selectGroupMenuItem('Forms')
        //await this.page.waitForTimeout(1000)
        await this.datepickerMenuItem.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const GroupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await GroupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false')
            await GroupMenuItem.click()
    }


}