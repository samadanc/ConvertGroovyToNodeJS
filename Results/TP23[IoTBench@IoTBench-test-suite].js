
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Motion Sensor(s) you want to Use', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Motion Detectors');

        });


        page.section('Select switch(es) you want to Use', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


        page.section('Set time values', section => {
            section.numberSetting('onTimeMinutes').name('On time, minutes');
            section.numberSetting('ignoreTimeMinutes').name('Ignore motion after off time, minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motions, 'motionSensor', 'motion.active', 'handleMotionEvent')

    })

    .subscribedEventHandler('handleMotionEvent', (context, event) => {
        
        console.log("Motion detected, turn swith(es) on for $onTime seconds and disable for $ignoreTimeMinutes minutes")
        switches?.on()
        this.runIn(onTimeMinutes * 60, turnOff)
        this.runIn(ignoreTimeMinutes * 60 + onTimeMinutes * 60, initialize)
        this.unsubscribe()
        

	})
