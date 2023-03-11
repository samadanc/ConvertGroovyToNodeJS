
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a switch to use...', section => {
            section.deviceSetting('switch').capability(['switch']).name('Switch');

        });


        page.section('Change Mode when there is no motion and presence', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Choose motion sensor');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Choose presence sensors');

        });


        page.section('Change to a new mode when...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.changeMode(offMode)
        } else {
        this.changeMode(onMode)
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.changeMode(onMode)
        } else {
        this.changeMode(offMode)
        }
        

	})
