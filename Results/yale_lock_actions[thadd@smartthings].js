
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('parsePayload', (context, event) => {
        
                let payload = event.description.substring(event.description.lastIndexOf('payload') + 9).split(' ')
                if (payload[3] == '15') {
                    if (payload[4] == '01') {
                        if (settings.tumblerLockPhrase) {
                            location.helloHome.execute(settings.tumblerLockPhrase)
                        }
                    } else {
                        if (payload[4] == '02') {
                            if (settings.pinLockPhrase) {
                                location.helloHome.execute(settings.pinLockPhrase)
                            }
                        }
                    }
                } else {
                    if (payload[3] == '16') {
                        if (settings.tumblerUnlockPhrase) {
                            location.helloHome.execute(settings.tumblerUnlockPhrase)
                        }
                    } else {
                        if (payload[3] == '13') {
                            let pin = payload[4]
                            if (settings.pinUnlockPhrase) {
                                location.helloHome.execute(settings.pinUnlockPhrase)
                            }
                        }
                    }
                }
            

	})
