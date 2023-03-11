
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Description'', section => {

        });


        page.section('Garage Door Contact Sensors', section => {
            section.deviceSetting('garageSensor').capability(['contactSensor']).name('What is your garage door sensor?');

        });


        page.section('Garage Door Opener', section => {
            section.deviceSetting('garageOpener').capability(['switch']).name('Which switch opens your garage door?');

        });


        page.section('Who is in your family?', section => {
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('These presence sensors');

        });


        page.section('Which mode triggers the process?', section => {

        });


        page.section('Verbose logging', section => {
            section.booleanSetting('logToNotifications').name('Log to notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        if (event.value == watchMode ) {
        this.logit("$watchMode detected...running!")
        this.openDoorIfHome()
        }
        

	})
