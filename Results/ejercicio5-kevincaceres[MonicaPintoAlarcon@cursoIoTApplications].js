
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona el sensor de movimiento:', section => {
            section.deviceSetting('elSensorMov').capability(['motionSensor']).name('Sensor Movimiento?');

        });


        page.section('Selecciona la luz a encender/apagar:', section => {
            section.deviceSetting('elInterruptor').capability(['switch']).name('Interruptor?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.elSensorMov, 'motionSensor', 'motion', 'movimientoDetectadoManejador')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('El sol se escondio')
        

	})

    .subscribedEventHandler('movimientoDetectadoManejador', (context, event) => {
        
        console.log("movimientoDetectadoManejador called: $evt")
        let noParams = this.getSunriseAndSunset()
        console.log("sunrise ${noParams.sunrise}")
        console.log("sunset ${noParams.sunset}")
        console.log("sunset ${noParams.sunset.time}")
        console.log("now ${this.now()}")
        if (event.value == 'active') {
        if (this.now() > noParams.sunset.time) {
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', on)
    
        console.log('Es de noche')
        } else {
        console.log('Es de dia')
        }
        } else {
        if (event.value == 'inactive') {
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', off)
    
        }
        }
        

	})
