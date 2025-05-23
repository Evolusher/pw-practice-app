import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{

    //private readonly page: Page

    constructor(page: Page){
        super(page)
    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputFieled = this.page.getByPlaceholder('Form Picker')
        await calendarInputFieled.click()
        const dateToAssert = await this.selectDateintheCalendar(numberOfDaysFromToday)
        await expect(calendarInputFieled).toHaveValue(dateToAssert)    
    }

    async selectdatepickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number){
        const calendarInputFieled = this.page.getByPlaceholder('Range Picker')
        await calendarInputFieled.click()
        const dateToAssertStart = await this.selectDateintheCalendar(startDateFromToday)
        const dateToAssertEnd = await this.selectDateintheCalendar(endDateFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputFieled).toHaveValue(dateToAssert) 

    }

    private async selectDateintheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate()+numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthANdYear = ` ${expectedMonthLong} ${expectedYear} `
        while(!calendarMonthAndYear.includes(expectedMonthANdYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('[class="day-cell ng-star-inserted"]').or(this.page.locator('[class="range-cell day-cell ng-star-inserted"]')).getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }

}