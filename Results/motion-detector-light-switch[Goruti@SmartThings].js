
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn this Light On/Off', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Which dimmer?');

        });


        page.section('Turn this Switch On/Off', section => {
            section.deviceSetting('switchSwitch').capability(['switch']).name('');

        });


        page.section('Turn-Switch On when there\'s been  movement for', section => {
            section.numberSetting('SwitchSecondsOn').name('Seconds?');

        });


        page.section('Turn-Light Off when there\'s been no movement for', section => {
            section.numberSetting('LightSecondsOff').name('Seconds?');

        });


        page.section('Turn-Switch Off when there\'s been no movement for', section => {
            section.numberSetting('SwitchSecondsOff').name('Seconds?');

        });


        page.section('DO NOT run when Home Modes...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        let curMode = location.mode
        if (!(HomeMode?.find({
        it == curMode
        }))) {
        console.log('Switch Light on')
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', setLevel)
    
        }
        this.runIn(SwitchSecondsOn, checkMotion)
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called from ${evt?.displayName}")
        this.runIn(LightSecondsOff, checkMotion)
        

	})
