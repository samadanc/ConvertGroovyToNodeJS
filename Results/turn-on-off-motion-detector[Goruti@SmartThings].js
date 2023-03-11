
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on this light when Mode is Home', section => {
            section.deviceSetting('switchHome').capability(['switch']).name('');

        });


        page.section('Dimmer to make bright when Mode is Night', section => {
            section.deviceSetting('dimmerNight').capability(['switchLevel']).name('Which dimmer?');
            section.numberSetting('brightness').name('Light Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        let curMode = location.mode
        if (curMode == 'Home') {
        
        context.api.devices.sendCommands(context.config.switchHome, 'switch', on)
    
        console.log('In Home Mode')
        } else {
        if (curMode == 'Night') {
        if (dimmerNight && brightness ) {
        
        context.api.devices.sendCommands(context.config.dimmerNight, 'switchLevel', setLevel)
    
        console.log("In Night Mode; setting brightness: $brightness")
        }
        } else {
        console.log('Home is in Away mode, doing nothing')
        }
        }
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
