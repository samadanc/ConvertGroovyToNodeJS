
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.textSetting('zipCode').name('Weather Report Zip Code');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('getData', delay);

        context.api.schedules.runEvery15Minutes('getForecast', delay);

    })

    .scheduledEventHandler('getData', (context, event) => {
        
        console.log('Checking ComEd Rates!')
        let params = ['uri': 'https://hourlypricing.comed.com/api?type=currenthouraverage', 'contentType': 'application/json']
        try {
        this.httpGet(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        let timeString = new Date("${resp.data[0].millisUTC}".toLong()).format('MM-dd-yy h:mm:ss a', location.timeZone)
        let newPrice = resp.data[0].price
        console.log("ComEd returned price $newPrice for $timeString")
        let children = this.getChildApps()
        console.log("${children.size}() child apps installed")
        children.each({ let child ->
        console.log("Sending price $newPrice to child app id ${child.id}")
        child.processPriceChange(Double.parseDouble(newPrice), timeString, state.previousPrice)
        })
        state.previousPrice = Double.parseDouble(newPrice)
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        

	})
