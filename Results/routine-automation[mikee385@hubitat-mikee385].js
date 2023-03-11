
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('routine').capability(['switch']).name('Routine');

        });


        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('switchOn').capability(['switch']).name('Switches to Turn On');
            section.deviceSetting('switchOff').capability(['switch']).name('Switches to Turn Off');

        });


        page.section('', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Send Message To');
            section.textSetting('message').name('Message Text');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.routine, 'switch', 'switch.on', 'routineHandler')

    })

    .subscribedEventHandler('routineHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (mode) {
        location.setMode(mode)
        }
        for (let device : switchOn ) {
        device.on()
        }
        for (let device : switchOff ) {
        device.off()
        }
        if (notifier && message ) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        

	})
