
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select First Valve(s):', section => {
            section.deviceSetting('valves1').capability(['switch']).name('');
            section.numberSetting('startHour1').name('Start Hour');
            section.numberSetting('stopHour1').name('Stop Hour');
            section.enumSetting('minutes').name('Run how many times an Hour?');
            section.numberSetting('duration').name('For how many seconds?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('openValve', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.valves1, 'switch', 'switch.on', 'valveOnHandler')

    })

    .subscribedEventHandler('valveOnHandler', (context, event) => {
        
        console.log("Valve $valves1 turned: ${event.value}")
        let delay = duration
        console.log("Turning off in ${(duration / 60)} minutes ($delayseconds)")
        this.runIn(delay, closeValve)
        

	})

    .scheduledEventHandler('openValve', (context, event) => {
        
        console.log("Turning on Sprinklers $valves1")
        
        context.api.devices.sendCommands(context.config.valves1, 'switch', on)
    
        

	})
