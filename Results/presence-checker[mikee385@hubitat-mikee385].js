
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Presence Sensors');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'device.PersonStatus', 'presence', 'personHandler')

    })

    .subscribedEventHandler('personHandler', (context, event) => {
        
        this.logDebug("personHandler: ${event.device} changed to ${event.value}")
        this.runIn(30, presenceCheck)
        

	})
