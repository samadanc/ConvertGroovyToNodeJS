
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Activations', section => {
            section.deviceSetting('buttonDevice').capability(['button']).name('Which?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion Sensors?');

        });


        page.section('Control these dimmers...', section => {
            section.deviceSetting('dimmerDevices').capability(['switchLevel']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDevice, 'button', 'button', 'testHandler')

    })

    .subscribedEventHandler('testHandler', (context, event) => {
        
        console.log("testHandler: ${event.value}")
        this.flashLights()
        

	})

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("eventHandler: ${event.value}")
        if (event.value == 'active') {
        this.flashLights()
        this.flashLights()
        }
        

	})
