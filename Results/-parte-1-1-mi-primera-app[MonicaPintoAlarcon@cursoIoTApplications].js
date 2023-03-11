
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona el sensor de movimiento:', section => {
            section.deviceSetting('elSensorMov').capability(['motionSensor']).name('Sensor de movimiento?');

        });


        page.section('Selecciona la luz a encender/apagar', section => {
            section.deviceSetting('elInterruptor').capability(['switch']).name('Interruptor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.elSensorMov, 'motionSensor', 'motion', 'movimientoDetectadoManejador')

    })

    .subscribedEventHandler('movimientoDetectadoManejador', (context, event) => {
        
        console.log("movimientoDetectadoManejador called: $evt")
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', off)
    
        }
        }
        

	})
