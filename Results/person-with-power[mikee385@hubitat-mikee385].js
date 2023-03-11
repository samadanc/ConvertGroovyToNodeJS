
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Presence Sensor');
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Power Meter');
            section.deviceSetting('guest').capability(['presenceSensor']).name('Guest');
            section.deviceSetting('bedroomDoor').capability(['contactSensor']).name('Bedroom Door');
            section.deviceSetting('exteriorDoors').capability(['contactSensor']).name('Exterior Doors');

        });


        page.section('Notifications', section => {
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

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeter, 'powerMeter', 'power', 'powerMeterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bedroomDoor, 'contactSensor', 'contact', 'bedroomDoorHandler')

    })

    .subscribedEventHandler('bedroomDoorHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        if
        state.wakingUp = true
        if (alertAwake) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('exteriorDoorHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        if
        state.wakingUp = false
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', awake)
    
        if (alertAwake) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
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

    .subscribedEventHandler('powerMeterHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        if
        
        context.api.devices.sendCommands(context.config.person, 'device.PersonStatus', asleep)
    
        if (alertAsleep) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        } else {
        if (state.wakingUp == true) {
        state.wakingUp = false
        if (alertAsleep) {
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        state.wakingUp = false
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
