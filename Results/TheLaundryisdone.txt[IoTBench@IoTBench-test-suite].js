
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('If there\'s movement (device is active)...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Acceleration Sensor');

        });


        page.section('And it has been active for...', section => {
            section.numberSetting('delayMinutes').name('Minutes?');

        });


        page.section('Then send this message in a push notification', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('And as text message to this number (optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration', 'accelerationHandler')

    })

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
        console.log("Device: ${event.value}")
        if (event.value == 'active') {
        console.log('Working...')
        state.motionActiveTime = this.now()
        state.motionStopTime = 0
        } else {
        if (event.value == 'inactive') {
        state.motionStopTime = this.now()
        let elapsed = this.now() - state.motionActiveTime
        console.log("It have been active for $elapsed")
        if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
        state.motionActiveTime = 0
        this.scheduleCheck()
        }
        }
        }
        

	})
