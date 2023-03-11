
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.textSetting('numerousApiKey').name('Please enter your Numerous API Key');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('powerEventHandler', (context, event) => {
        
        console.log("Power event value is ${event.value}")
        this.postToNumerous(metric, event.value)
        

	})
