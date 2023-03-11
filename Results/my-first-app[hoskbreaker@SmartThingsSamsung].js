
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona el sensor de movimiento', section => {
            section.deviceSetting('SensorMov').capability(['motionSensor']).name('Sensor de movimiento');

        });


        page.section('Selecciona la luz a encender/apagar', section => {
            section.deviceSetting('ElInterruptor').capability(['switch']).name('Interruptor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.SensorMov, 'motionSensor', 'motion', 'movHandler')

    })

    .subscribedEventHandler('movHandler', (context, event) => {
        
        if (event.value == 'active') {
        console.log("movHandler called: ${event.value}")
        
        context.api.devices.sendCommands(context.config.ElInterruptor, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        console.log("movHandler called: ${event.value}")
        
        context.api.devices.sendCommands(context.config.ElInterruptor, 'switch', off)
    
        }
        }
        

	})
