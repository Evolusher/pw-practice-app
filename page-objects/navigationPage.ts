import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    //readonly page: Page

    constructor(page: Page){
        super(page)
    }

    async formLayoutPage(){
        await this.selectGroupMenuItem('Forms')
        await this.selectMenuItem('Form Layouts')
        await this.waitForNumberOFSeconds(2)
    }

    async DatepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.selectMenuItem('Datepicker')
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.selectMenuItem('Smart Table')
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.selectMenuItem('Toastr')
    }

    async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.selectMenuItem('Tooltip')
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const GroupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await GroupMenuItem.getAttribute('aria-expanded')
        if(expandedState == 'false')
            await GroupMenuItem.click()
    }

    private async selectMenuItem(menuItemTitle: string){
        await this.page.getByText(menuItemTitle).click()
    }


}