
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the water sensor(s) you\'d like to monitor.', section => {
            section.deviceSetting('sensors').capability(['waterSensor']).name('Which sensor(s) to monitor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'waterSensor', 'water', 'waterChangeHandler')

    })

    .subscribedEventHandler('waterChangeHandler', (context, event) => {
        
        if (event.value == 'wet') {
        this.sendPush("ALERT: Water has been detected near the ${event.device.getLabel().toLowerCase()}!")
        } else {
        this.sendPush("Water is no longer being detected near the ${event.device.getLabel().toLowerCase()}.")
        }
        

	})
