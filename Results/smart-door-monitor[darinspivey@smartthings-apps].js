
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Description'', section => {

        });


        page.section('Contact Sensors', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which sensors to monitor?');

        });


        page.section('Wait for departure of ANY of...', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('These presence sensors');

        });


        page.section('Verbose logging', section => {
            section.booleanSetting('logToNotifications').name('Log to notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        let person = event.displayName
        this.logit("Presence Event: $person is ${event.value}")
        if (this.hasLeft(person)) {
        if (state.stillExecuting) {
        return null
        }
        state.stillExecuting = true
        this.findOpenSensors()
        } else {
        this.turnOff()
        }
        

	})
