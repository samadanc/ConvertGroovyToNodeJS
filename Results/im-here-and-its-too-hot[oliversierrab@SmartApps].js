
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Monitor the temperature', section => {
            section.deviceSetting('thetemp').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature rises above', section => {
            section.numberSetting('temperature1').name('Temperature?');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on this switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        let turnOn = this.checkTempAndTime()
        console.log("Should it turn on? $turnOn")
        if (turnOn) {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
