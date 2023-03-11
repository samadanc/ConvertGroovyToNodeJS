
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('exteriorLights').capability(['switch']).name('Exterior Lights');
            section.deviceSetting('exteriorDoor').capability(['contactSensor']).name('Exterior Door');
            section.deviceSetting('sunlight').capability(['switch']).name('Sunlight');

        });


        page.section('Reminder', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sunlight, 'switch', 'switch.on', 'sunlightHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.exteriorDoor, 'contactSensor', 'contact', 'exteriorDoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'device.PersonStatus', 'state', 'personHandler')

    })

    .subscribedEventHandler('exteriorDoorHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.value == 'open') {
        if
        for (let light : exteriorLights ) {
        light.on()
        }
        }
        this.runIn(60 * 5, reminderAlert)
        } else {
        this.unschedule('reminderAlert')
        }
        

	})

    .subscribedEventHandler('personHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.value != 'home') {
        this.unsubscribe('reminderAlert')
        if
        
        context.api.devices.sendCommands(context.config.notifier, 'notification', deviceNotification)
    
        }
        }
        

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if (event.value == 'Sleep') {
        for (let light : exteriorLights ) {
        light.off()
        }
        }
        

	})

    .subscribedEventHandler('sunlightHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        for (let light : exteriorLights ) {
        light.off()
        }
        

	})
