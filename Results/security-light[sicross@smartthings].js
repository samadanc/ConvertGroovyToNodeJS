
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Choose a motion sensor');
            section.deviceSetting('thecontact').capability(['contactSensor']).name('or a contact sensor');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Choose a light or switch');

        });


        page.section('Delay', section => {
            section.numberSetting('motionDelay').name('After motion was detected, how long (in minutes) would you like to keep the light on for?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thecontact, 'contactSensor', 'contact.open', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thecontact, 'contactSensor', 'contact.closed', 'motionCompleteHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionCompleteHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', currentValue)
    
        if (switchState == 'off') {
        console.log('Motion detected, switch was off, turning switch ON, starting timer')
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        state.triggered = true
        if 
        motionDelay = 1
        }
        
        context.api.devices.sendCommands(context.config.motionDelay, 'number', runIn)
    
        } else {
        if (state.triggered == true) {
        console.log('Motion detected, but switch was already on because of previous movement, restarting timer again.')
        if 
        motionDelay = 1
        }
        
        context.api.devices.sendCommands(context.config.motionDelay, 'number', runIn)
    
        } else {
        console.log('Motion detected, but switch was already manually switched on, so leaving switch on.')
        state.triggered = false
        }
        }
        

	})

    .subscribedEventHandler('motionCompleteHandler', (context, event) => {
        
        

	})
