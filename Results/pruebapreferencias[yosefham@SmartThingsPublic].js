
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('localizacion', (context, event) => {
        
                if ('present' == event.value) {
                    if (tipoNotificacion == 'ambos') {
                        if (location.contactBookEnabled) {
                            this.sendNotificationToContacts('aqui estas jojojojojo', receptores)
                        } else {
                            if (numero) {
                                this.sendSmsMessage(numero, 'aqui estas jejejeje')
                            }
                        }
                        this.sendPushMessage('aqui estas xdxdxdxdxdxd')
                    } else {
                        if (tipoNotificacion == 'push') {
                            this.sendPushMessage('aqui estas jajajaja')
                        } else {
                            if (location.contactBookEnabled) {
                                this.sendNotificationToContacts('aqui estas jijijiji', receptores)
                            } else {
                                if (numero) {
                                    this.sendSmsMessage(numero, 'aqui estas hahahaha')
                                }
                            }
                        }
                    }
                } else {
                    if (tipoNotificacion == 'ambos') {
                        if (location.contactBookEnabled) {
                            this.sendNotificationToContacts('aqui faltas jojojojojo', receptores)
                        } else {
                            if (numero) {
                                this.sendSmsMessage(numero, 'aqui faltas jejejeje')
                            }
                        }
                        this.sendPushMessage('aqui faltas xdxdxdxdxdxd')
                    } else {
                        if (tipoNotificacion == 'push') {
                            this.sendPushMessage('aqui faltas jajajaja')
                        } else {
                            if (location.contactBookEnabled) {
                                this.sendNotificationToContacts('aqui faltas jijijiji', receptores)
                            } else {
                                if (numero) {
                                    this.sendSmsMessage(numero, 'aqui faltas hahahaha')
                                }
                            }
                        }
                    }
                }
            

	})
