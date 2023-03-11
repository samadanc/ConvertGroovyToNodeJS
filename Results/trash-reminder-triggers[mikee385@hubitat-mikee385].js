
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('reminderSwitch').capability(['switch']).name('Reminder Switch');

        });


        page.section('Turn On', section => {

        });


        page.section('Turn Off', section => {
            section.deviceSetting('overheadDoor').capability(['contactSensor']).name('Garage Door');
            section.enumSetting('trashDays').name('Trash Days');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.overheadDoor, 'contactSensor', 'contact', 'overheadDoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'device.PersonStatus', 'sleeping.not sleeping', 'awakeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.person, 'device.PersonStatus', 'state', 'stateHandler')

    })

    .subscribedEventHandler('stateHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        if
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('overheadDoorHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('awakeHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        if
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let day = df.format(new Date())
        if
        
        context.api.devices.sendCommands(context.config.reminderSwitch, 'switch', on)
    
        }
        }
        

	})
