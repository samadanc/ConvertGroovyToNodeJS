
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence Sensor');

        });


        page.section('Notifications', section => {
            section.booleanSetting('alertArrived').name('Alert when Arrived?');
            section.booleanSetting('alertDeparted').name('Alert when Departed?');
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
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
