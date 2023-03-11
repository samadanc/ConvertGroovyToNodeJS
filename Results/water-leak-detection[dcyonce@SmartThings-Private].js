
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Water Leak Detection - dcyonce'', section => {

        });


        page.section('When water is sensed...', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Where?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


        page.section('Send alert every xxx minutes ...', section => {
            section.numberSetting('resendTime').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water', 'EventHandler')

    })

    .subscribedEventHandler('EventHandler', (context, event) => {
        
        console.log("event.Value=${event.value}")
        console.log("Sensor = ${event.displayName}")
        let message = ''
        if (event.value == 'wet') {
        message = "$location ${event.displayName} has detected a water leak!"
        state.isWet = 'true'
        state.sensorName = "${event.displayName}"
        this.runIn(resendTime * 60, ResendAlert)
        } else {
        message = "$location ${event.displayName} is now dry."
        state.isWet = 'false'
        }
        this.SendNotification(message)
        

	})
