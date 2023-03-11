
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Water Sensor', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Sensor');

        });


        page.section('Switch To Flash', section => {
            section.deviceSetting('lights').capability(['switch']).name('Switches');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendNotifications').name('Send Notifications');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'startFlashingIfNecessary')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water.dry', 'startFlashingIfNecessary')

    })

    .subscribedEventHandler('startFlashingIfNecessary', (context, event) => {
        
        if (!(this.shouldBeFlashing())) {
        return null
        }
        this.captureInitialLightState()
        this.notifyIfNecessary()
        this.flashIfNecessary()
        

	})
