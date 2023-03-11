
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SENSOR', section => {
            section.textSetting('llegando').name('');
            section.textSetting('saliendo').name('');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Elige un sensor: ');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'localizacion')

    })

    .subscribedEventHandler('localizacion', (context, event) => {
        
        if ('present' == event.value) {
        if (tipoNotificacion == 'ambos') {
        if (location.contactBookEnabled) {
        if (llegando) {
        this.sendNotificationToContacts(llegando, receptores)
        } else {
        this.sendNotificationToContacts('aqui estas jojojojojo', receptores)
        }
        } else {
        if (numero) {
        if (llegando) {
        this.sendSmsMessage(numero, llegando)
        } else {
        this.sendSmsMessage(numero, 'aqui estas jejejeje')
        }
        }
        }
        if (llegando) {
        this.sendPushMessage(llegando)
        } else {
        this.sendPushMessage('aqui estas xdxdxdxdxdxd')
        }
        } else {
        if (tipoNotificacion == 'push') {
        if (llegando) {
        this.sendPushMessage(llegando)
        } else {
        this.sendPushMessage('aqui estas jajajaja')
        }
        } else {
        if (location.contactBookEnabled) {
        if (llegando) {
        this.sendNotificationToContacts(llegando, receptores)
        } else {
        this.sendNotificationToContacts('aqui estas jijijijiji', receptores)
        }
        } else {
        if (numero) {
        if (llegando) {
        this.sendSmsMessage(numero, llegando)
        } else {
        this.sendSmsMessage(numero, 'aqui estas hahahahaha')
        }
        }
        }
        }
        }
        } else {
        if (tipoNotificacion == 'ambos') {
        if (location.contactBookEnabled) {
        if (saliendo) {
        this.sendNotificationToContacts(saliendo, receptores)
        } else {
        this.sendNotificationToContacts('aqui estas jojojojojo', receptores)
        }
        } else {
        if (numero) {
        if (saliendo) {
        this.sendSmsMessage(numero, saliendo)
        } else {
        this.sendSmsMessage(numero, 'aqui estas jejejeje')
        }
        }
        }
        if (saliendo) {
        this.sendPushMessage(saliendo)
        } else {
        this.sendPushMessage('aqui estas xdxdxdxdxdxd')
        }
        } else {
        if (tipoNotificacion == 'push') {
        if (saliendo) {
        this.sendPushMessage(saliendo)
        } else {
        this.sendPushMessage('aqui estas jajajaja')
        }
        } else {
        if (location.contactBookEnabled) {
        if (saliendo) {
        this.sendNotificationToContacts(saliendo, receptores)
        } else {
        this.sendNotificationToContacts('aqui estas jijijijiji', receptores)
        }
        } else {
        if (numero) {
        if (saliendo) {
        this.sendSmsMessage(numero, saliendo)
        } else {
        this.sendSmsMessage(numero, 'aqui estas hahahahaha')
        }
        }
        }
        }
        }
        }
        

	})
