
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Light switches to turn off', section => {
            section.deviceSetting('switches').capability(['switch']).name('Choose light switches');

        });


        page.section('Turn off when there is no motion and presence', section => {
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('Choose motion sensor');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Choose presence sensors');

        });


        page.section('Delay before turning off', section => {
            section.numberSetting('delayMins').name('Minutes of inactivity?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensors, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("handler ${event.name}: ${event.value}")
        if (event.value == 'inactive') {
        this.runIn(delayMins * 60, scheduleCheck, ['overwrite': true])
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("handler ${event.name}: ${event.value}")
        if (event.value == 'not present') {
        this.runIn(delayMins * 60, scheduleCheck, ['overwrite': true])
        }
        

	})
