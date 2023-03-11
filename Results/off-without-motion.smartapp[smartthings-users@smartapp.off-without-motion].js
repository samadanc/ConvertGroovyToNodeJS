
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Detect movement on...', section => {
            section.deviceSetting('motion_detector').capability(['motionSensor']).name('Where?');

        });


        page.section('When there has been no movement for...', section => {
            section.numberSetting('minutesLater').name('Minutes?');

        });


        page.section('Turn off the following...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_detector, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name} is ${event.value}.")
        if (event.value == 'active') {
        console.log('Cancelling previous turn off task...')
        this.unschedule(turnOff)
        } else {
        let delay = minutesLater * 60
        console.log("Turning off switches in $minutesLater minutes ($delays).")
        this.runIn(delay, turnOff)
        }
        

	})
