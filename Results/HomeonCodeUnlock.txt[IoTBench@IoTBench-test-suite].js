
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                if (event.name == 'lock') {
                    if (event.value == 'unlocked') {
                        if (!state.unlockSetHome) {
                            if (event.data != '' && event.data != null) {
                                let data = new JsonSlurper().parseText(event.data)
                                if (data.usedCode != '' && data.usedCode != null) {
                                    if (data.usedCode == lockCode1 ) {
                                        console.log("${lock1.displayName} unlocked with code ${data.usedCode} - $userName is Home!")
                                        if (location.mode != 'Home') {
                                            this.sendNotificationEvent("Running "$homePhrase" because $userName unlocked ${lock1.displayName}.")
                                            state.unlockSetHome = true
                                            location.helloHome.execute(settings.homePhrase)
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (event.value == 'locked') {
                            if (state.unlockSetHome) {
                                if (presence1.find({ 
                                    it.currentPresence == 'present'
                                }) == null) {
                                    if (location.mode != 'Away') {
                                        this.sendNotificationEvent("Running "$awayPhrase" because $userName locked ${lock1.displayName} and nobody else is at home.")
                                        state.unlockSetHome = false
                                        location.helloHome.execute(settings.awayPhrase)
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
