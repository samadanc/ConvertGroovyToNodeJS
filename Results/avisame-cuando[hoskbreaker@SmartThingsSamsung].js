
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('SensorPresencia').capability(['presenceSensor']).name('Selecciona el sensor de presencia');
            section.enumSetting('tipoNotificacion').name('Tipo?');
            section.textSetting('TXTIN').name('Introduzca el mensaje al entrar');
            section.textSetting('TXTOUT').name('Introduzca el mensaje al salir');
            section.timeSetting('HIN').name('hora inicial: ');
            section.timeSetting('HOUT').name('hora final: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.SensorPresencia, 'presenceSensor', 'Presence', 'PresHandler')

    })

    .subscribedEventHandler('PresHandler', (context, event) => {
        
        console.log("Sensor de presencia: ${event.value}")
        if (event.value == 'present' && this.timeOfDayIsBetween(settings.HIN, settings.HOUT, event.date, location.timeZone) && settings.HubMode == location.mode) {
        console.log("mensaje de entrada: ${settings.TXTIN}")
        if (settings.tipoNotificacion == '0' || settings.tipoNotificacion == 'push') {
        this.sendPush(settings.TXTIN)
        } else {
        if (settings.tipoNotificacion == '1' || settings.tipoNotificacion == 'sms') {
        this.sendSms(settings.receptores, settings.TXTIN)
        } else {
        this.sendPush(settings.TXTIN)
        this.sendSms(settings.receptores, settings.TXTIN)
        }
        }
        } else {
        if (event.value == 'not present' && this.timeOfDayIsBetween(settings.HIN, settings.HOUT, event.date, location.timeZone) && settings.HubMode == location.mode) {
        console.log("mensaje de salida: ${settings.TXTOUT}")
        if (settings.tipoNotificacion == '0' || settings.tipoNotificacion == 'push') {
        this.sendPush(settings.TXTOUT)
        } else {
        if (settings.tipoNotificacion == '1' || settings.tipoNotificacion == 'sms') {
        this.sendSms(settings.receptores, settings.TXTOUT)
        } else {
        this.sendPush(settings.TXTOUT)
        this.sendSms(settings.receptores, settings.TXTOUT)
        }
        }
        }
        }
        

	})
