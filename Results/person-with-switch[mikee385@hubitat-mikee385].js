
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence Sensor');
            section.deviceSetting('switchSensor').capability(['switch']).name('Switch');

        });


        page.section('Alerts', section => {
            section.booleanSetting('alertArrived').name('Alert when Arrived?');
            section.booleanSetting('alertDeparted').name('Alert when Departed?');
            section.booleanSetting('alertAwake').name('Alert when Awake?');
            section.booleanSetting('alertAsleep').name('Alert when Asleep?');
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'presenceHandler_PersonStatus')

        await context.api.subscriptions.subscribeToDevices(context.config.switchSensor, 'switch', 'switch.on', 'handler_AwayAlert')

        await context.api.subscriptions.subscribeToDevices(context.config.switchSensor, 'switch', 'switch', 'switchHandler_PersonStatus')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeHandler_Switch')

    })

    .subscribedEventHandler('modeHandler_Switch', (context, event) => {
        
        this.logDebug("modeHandler_Switch: ${event.device} changed to ${event.value}")
        if (event.value == 'Away') {
        
        context.api.devices.sendCommands(context.config.switchSensor, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('handler_AwayAlert', (context, event) => {
        
        this.logDebug("handler_AwayAlert: ${event.device} changed to ${event.value}")
        if (location.mode == 'Away') {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        

	})

    .subscribedEventHandler('switchHandler_PersonStatus', (context, event) => {
        
        this.logDebug("switchHandler_PersonStatus: ${event.device} changed to ${event.value}")
        if
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', asleep)
    
        if (alertAsleep) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        } else {
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', awake)
    
        if (alertAwake) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('presenceHandler_PersonStatus', (context, event) => {
        
        this.logDebug("presenceHandler_PersonStatus: ${event.device} changed to ${event.value}")
        if
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', arrived)
    
        if (alertArrived) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        } else {
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', departed)
    
        if (alertDeparted) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        }
        

	})
