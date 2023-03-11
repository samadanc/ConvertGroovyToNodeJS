
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which light sensor?', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('');

        });


        page.section('What LUX level is considered dark?', section => {
            section.numberSetting('luxLevel').name('');

        });


        page.section('Which lights to turn on/off?', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

    })

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
        let darkness = settings.luxLevel.toInteger
        console.log("Lux level for darkness is $darkness and the sensor sent ${event.integerValue}")
        if (event.integerValue < darkness ) {
        this.send("Lux level for darkness is $darkness and the sensor sent ${event.integerValue}, so turning ON the following switches: $lights")
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        } else {
        this.send("Lux level for darkness is $darkness and the sensor sent ${event.integerValue}, so turning OFF the following switches: $lights")
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        }
        

	})
