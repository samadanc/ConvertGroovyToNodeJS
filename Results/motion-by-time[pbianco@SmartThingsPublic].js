
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configure', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimming lights?');
            section.deviceSetting('switches').capability(['switch']).name('Which lights?');
            section.enumSetting('days').name('What days would you like it to run on?');
            section.numberSetting('level').name('Light level? (10 - 99)');
            section.numberSetting('Delay').name('Delay to turn off lights?');
            section.timeSetting('timeOfDay').name('When would you like to start?');
            section.timeSetting('endTime').name('When would you like it to end?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('motionActiveHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let t0 = this.now()
        let DelayTime = Delay * 60
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        console.log("Time-Now: $t0")
        console.log("timeOfDay: $timeOfDay")
        console.log("endTime: $endTime")
        console.log("last turned on switches on , today is $dateString")
        console.log('turning on switches')
        console.log("Setting dimmer: $dimmer to level: $level")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})

    .scheduledEventHandler('motionActiveHandler', (context, event) => {
        
        let t0 = this.now()
        let DelayTime = Delay * 60
        console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
        console.log("Time-Now: $t0")
        console.log("timeOfDay: $timeOfDay")
        console.log("endTime: $endTime")
        console.log("last turned on switches on , today is $dateString")
        console.log('turning on switches')
        console.log("Setting dimmer: $dimmer to level: $level")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
