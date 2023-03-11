
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Delay before turning off.', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'on') {
        this.runIn(delay, switchesOff)
        } else {
        if (event.value == 'off') {
        }
        }
        

	})
