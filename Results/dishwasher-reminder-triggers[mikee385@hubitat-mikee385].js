
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('reminderSwitch').capability(['switch']).name('Reminder Switch');

        });


        page.section('Turn On', section => {
            section.deviceSetting('routine').capability(['switch']).name('Routine');

        });


        page.section('Turn Off', section => {

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.appliance, 'device.ApplianceStatus', 'state.running', 'runningHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.routine, 'switch', 'switch.on', 'routineHandler')

    })

    .subscribedEventHandler('runningHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('routineHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', on)
    
        }
        

	})
