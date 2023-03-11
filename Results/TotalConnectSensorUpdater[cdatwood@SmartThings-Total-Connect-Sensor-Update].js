
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors to force refresh...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which sensors?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'refresh', 'deviceHandlerRefresh')

    })

    .subscribedEventHandler('deviceHandlerRefresh', (context, event) => {
        
        if (event.value == 'open') {
        console.log('sensor is open!')
        } else {
        if (event.value == 'closed') {
        console.log('sensor is open!')
        }
        }
        

	})
