
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the Orbit timer', section => {
            section.deviceSetting('timerdevice').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.timerdevice, 'switch', 'switch', 'offHandler')

    })

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("Timer was turned ${event.value}...")
        if (event.value == 'on') {
        console.log('Scheduling OFF event to run in 10 minutes...')
        this.runIn(600, sendOffEvent, ['overwrite': true])
        }
        if (event.value == 'off') {
        console.log('Timer turned off so removing the schedule if there was one...')
        this.unschedule()
        }
        

	})
