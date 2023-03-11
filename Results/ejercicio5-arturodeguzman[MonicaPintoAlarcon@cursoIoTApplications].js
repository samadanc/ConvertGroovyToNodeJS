
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Selecciona el sensor de movimiento:', section => {
            section.deviceSetting('elSensorMov').capability(['motionSensor']).name('Sensor de movimiento?');

        });


        page.section('Selecciona la luz a encender/apagar:', section => {
            section.deviceSetting('elInterruptor').capability(['switch']).name('Interruptor?');

        });


        page.section('Notificaciones:', section => {
            section.enumSetting('tipoNotificacion').name('Seleccione tipo de notificacion');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.elSensorMov, 'motionSensor', 'motion.active', 'movimientoDetectadoManejador')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        console.log('Sun has risen!')
        let sunriseSunset = this.getSunriseAndSunset()
        state.sunrise = sunriseSunset.sunrise.time
        state.sunset = sunriseSunset.sunset.time
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('Sun has set!')
        

	})

    .subscribedEventHandler('movimientoDetectadoManejador', (context, event) => {
        
        console.log("movimientoDetectadoManejador called: $evt")
        if (event.value == 'active' && this.now() > state.sunset) {
        console.log('La hora actual es superior a la hora de puesta de sol, se encienden las luces!')
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', on)
    
        } else {
        if (event.value == 'active' && this.now() > state.sunrise && this.now() < state.sunset) {
        console.log('La hora actual esta entre la salida y la puesta del sol, se apagan las luces!')
        
        context.api.devices.sendCommands(context.config.elInterruptor, 'switch', off)
    
        }
        }
        

	})
