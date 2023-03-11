
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('theSensor').capability(['motionSensor']).name('Which motion sensor?');
            section.deviceSetting('theSwitch').capability(['switch']).name('Which switch?');
            section.numberSetting('turnOnTimeout').name('How long should the fan be turned on?');
            section.numberSetting('turnOffTimeout').name('How long should the fan be turned off?');
            section.numberSetting('interval').name('What is the interval (second)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'motionSensor', 'motion.inactive', 'theSensorInactiveHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'motionSensor', 'motion.active', 'theSensorActiveHandler')

    })

    .subscribedEventHandler('theSensorActiveHandler', (context, event) => {
        
        console.log('sensor is active')
        this.unschedule()
        this.runIn(interval * turnOnTimeout , turnTheSwitchOn)
        

	})

    .subscribedEventHandler('theSensorInactiveHandler', (context, event) => {
        
        console.log('sensor is INACTIVE')
        this.unschedule()
        this.runIn(interval * turnOffTimeout , turnTheSwitchOff)
        

	})
