
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door Push Button', section => {
            section.deviceSetting('doorControl').capability(['doorControl']).name('');

        });


        page.section('Garage Door Tilt Sensor', section => {
            section.deviceSetting('tiltSensor').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.tiltSensor, 'contactSensor', 'contact.open', 'doorOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.tiltSensor, 'contactSensor', 'contact.closed', 'doorClosedHandler')

    })

    .subscribedEventHandler('doorClosedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.doorControl, 'doorControl', setClosed)
    
        

	})

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.doorControl, 'doorControl', setOpen)
    
        

	})
