
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn on these dimmers', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('');
            section.numberSetting('level').name('Dimming level?');
            section.numberSetting('rate').name('Dimming rate?');

        });


        page.section('Active between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('Change to what mode?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        if (switches) {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', log)
    
        }
        if (dimmers) {
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', log)
    
        }
        let dimmerOn = this.isOn(dimmers)
        let switchOn = this.isOn(switches)
        java.lang.Boolean between = true
        console.log("no current setting for time between: ${between.toString()}")
        if (fromTime && toTime ) {
        between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        console.log("current setting for time $fromTime : $toTime and ${between.toString()}")
        } else {
        console.log("no current setting for time between: ${between.toString()}")
        }
        console.log("Current Status before changes : switchOn $switchOn and dimmerOn: $dimmerOn")
        if (between && !switchOn && !dimmerOn) {
        if (dimmers) {
        console.log('SetLevel(1) Before')
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', log)
    
        
        context.api.devices.sendCommands(context.config.dimmers, 'switchLevel', setLevel)
    
        }
        if (switches) {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', log)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        }
        } else {
        console.log('Motion ignored because switches or dimmers are on.')
        }
        if (newMode) {
        this.changeMode()
        }
        

	})
