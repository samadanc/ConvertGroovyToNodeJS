
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('CodeModeCheck', (context, event) => {
        
                if (location.mode != 'Home') {
                    if (event.name == 'lock') {
                        if (event.value == 'unlocked') {
                            console.log('|BSL| Door was unlocked')
                            if (event.data != '' && event.data != null) {
                                let data = new JsonSlurper().parseText(event.data)
                                if (data.usedCode != '' && data.usedCode != null) {
                                    console.log("|BSL| ${lock1.displayName} unlocked with ${data.usedCode}.")
                                    this.sendNotificationEvent("Running, $homePhrase, because ${lock1.displayName} unlocked by code ${data.usedCode}.")
                                    location.helloHome.execute(settings.homePhrase)
                                    this.send("${lock1.displayName} unlocked with code ${data.usedCode} while not Home, executing ${settings.homePhrase}")
                                }
                            }
                        }
                    }
                }
            

	})
