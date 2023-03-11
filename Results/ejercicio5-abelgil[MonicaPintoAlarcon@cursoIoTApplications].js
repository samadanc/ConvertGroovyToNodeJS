
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona el sensor de movimiento: ', section => {
            section.deviceSetting('elSensorMov').capability(['motionSensor']).name('Sensor Movimiento?');

        });


        page.section('Selecciona la luz a encender/apagar: ', section => {
            section.deviceSetting('elInterruptor').capability(['switch']).name('Interruptor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', off)
    
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        if
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', off)
    
        }
        

	})
