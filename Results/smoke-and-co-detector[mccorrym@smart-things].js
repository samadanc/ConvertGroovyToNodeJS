
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the contact sensors connected to the smoke detectors.', section => {
            section.deviceSetting('sensors').capability(['sensor']).name('Which sensors to monitor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'sensor', 'smoke', 'sensorChangeHandler')

    })

    .subscribedEventHandler('sensorChangeHandler', (context, event) => {
        
        console.log("Sensor ${event.device.getLabel()} has changed to: ${event.value}")
        

	})
