
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the opener device...', section => {
            section.deviceSetting('opener').capability(['switch']).name('Garage Door Opener');

        });


        page.section('Choose the sensor device...', section => {
            section.deviceSetting('sensor').capability(['contactSensor']).name('Garage Door Sensor');

        });


        page.section('Choose the virtual device...', section => {
            section.deviceSetting('virtual').capability(['doorControl']).name('Virtual Garage Door');

        });


        page.section('Timeout before checking if the door opened/closed correctly?', section => {
            section.numberSetting('checkTimeout').name('Seconds:');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtual, 'doorControl', 'open', 'virtualOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtual, 'doorControl', 'close', 'virtualCloseHandler')

    })

    .subscribedEventHandler('virtualCloseHandler', (context, event) => {
        
        if (sensor.currentContact == 'open') {
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, syncPhysical)
        }
        

	})

    .subscribedEventHandler('openerHandler', (context, event) => {
        
        if (sensor.currentContact == 'open') {
        
        context.api.devices.sendCommands(context.config.virtual, 'doorControl', close)
    
        this.runIn(checkTimeout, syncVirtual)
        } else {
        if (sensor.currentContact == 'closed') {
        
        context.api.devices.sendCommands(context.config.virtual, 'doorControl', open)
    
        this.runIn(checkTimeout, syncVirtual)
        }
        }
        

	})

    .subscribedEventHandler('virtualOpenHandler', (context, event) => {
        
        if (sensor.currentContact == 'closed') {
        
        context.api.devices.sendCommands(context.config.opener, 'switch', on)
    
        this.runIn(checkTimeout, syncPhysical)
        }
        

	})
