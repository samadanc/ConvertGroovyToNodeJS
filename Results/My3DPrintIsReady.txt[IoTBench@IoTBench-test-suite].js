
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('If there\'s movement (device is active)...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Acceleration Sensor');

        });


        page.section('And it has been no movement for...', section => {
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
        
        console.log("Device: ${event.value} and motionActiveTimes = ${state.motionActiveTimes}")
        if (event.value == 'active') {
        console.log('Working...')
        state.motionActiveTimes = state.motionActiveTimes + 1
        state.motionStopTime = 0
        this.unschedule()
        } else {
        state.motionStopTime = this.now()
        this.scheduleCheck()
        }
        

	})
