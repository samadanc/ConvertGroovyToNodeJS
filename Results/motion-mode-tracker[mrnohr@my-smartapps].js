
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which motion sensor(s) to watch?');

        });


        page.section('When?', section => {

        });


        page.section('Notifications', section => {
            section.textSetting('notificationPrefix').name('Text to append before \');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("In motionActiveHandler for ${event.name} = ${event.value}")
        state.motionCount = state.motionCount + 1
        console.log("So far motion has been detected ${state.motionCount} times")
        

	})
