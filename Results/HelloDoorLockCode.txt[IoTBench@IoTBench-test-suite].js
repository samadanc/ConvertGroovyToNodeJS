
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('checkCode', (context, event) => {
        
                console.log("${event.value}: $evt, $settings")
                if (event.value == 'unlocked' && event.data) {
                    let lockData = new JsonSlurper().parseText(event.data)
                    if (discoveryMode) {
                        this.sendPush("Door unlocked with user code ${lockData.usedCode}")
                    }
                    if (lockData.usedCode == visitorCode && discoveryMode == false) {
                        log.info('Door Unlocked Notification Sent')
                        if (actionType == 'Change Mode') {
                            this.changeMode(visitormode)
                        }
                        if (actionType == 'Run Hello Home Action') {
                            location.helloHome.execute(homeAction)
                        }
                        this.sendMessage(visitorMsg)
                    }
                }
            

	})
