
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens/closes...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Pause this many minutes after door closed before turning off...', section => {
            section.numberSetting('pauseMinutes').name('Minutes?');

        });


        page.section('If door does not close, turn the light off after this amount of time...', section => {
            section.numberSetting('offMinutes').name('Minutes?');

        });


        page.section('Force the light off after this amount of time (regardless of how it was turned on)...', section => {
            section.numberSetting('forceOffMinutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        log.info("Door ${event.value}")
        if (event.value == 'open') {
        this.unschedule('scheduledTurnOff')
        state.doorTrigger = true
        if
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        this.scheduleLightShutOff()
        }
        } else {
        if (event.value == 'closed') {
        if (pauseMinutes ? pauseMinutes : 0 > 0) {
        if
        this.shutOffIn(pauseMinutes * 60)
        }
        } else {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        this.unschedule('scheduledTurnOff')
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        this.scheduleLightShutOff()
        

	})
