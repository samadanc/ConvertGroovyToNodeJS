
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitoriza estas puertas', section => {
            section.deviceSetting('puertas').capability(['contactSensor']).name('');

        });


        page.section('Y notificame cuando se queden abiertas mas de este número de minutos (por defecto 10)', section => {
            section.numberSetting('tiempoAbiertas').name('');

        });


        page.section('Mediante un mensaje de texto a este numero (o mediante un push si no se especifica numero', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.puertas, 'contactSensor', 'contact.closed', 'puertaCerrada')

        await context.api.subscriptions.subscribeToDevices(context.config.puertas, 'contactSensor', 'contact.open', 'puertaAbierta')

    })

    .subscribedEventHandler('puertaCerrada', (context, event) => {
        
        log.trace("puertaCerrada(${event.name}: ${event.value})")
        

	})

    .subscribedEventHandler('puertaAbierta', (context, event) => {
        
        log.trace("puertaAbierta(${event.name}: ${event.value})")
        let retraso = tiempoAbiertas != null && tiempoAbiertas != '' ? tiempoAbiertas * 60 : 600
        this.runIn(retraso, puertaAbiertaDemasiadoTiempo)
        console.log('planificación de puerta abierta demasiado tiempo ...')
        

	})
