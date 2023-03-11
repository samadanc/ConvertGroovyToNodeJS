
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                if (contact.latestValue('contact') == 'closed' && event.value == 'locked') {
                    this.unschedule(lockDoor)
                } else {
                    if (contact.latestValue('contact') == 'closed' && event.value == 'unlocked') {
                        this.runIn(secondsLater, lockDoor)
                    } else {
                        if (lock1.latestValue('lock') == 'unlocked' && event.value == 'open') {
                            this.unschedule(lockDoor)
                        } else {
                            if (lock1.latestValue('lock') == 'unlocked' && event.value == 'closed') {
                                this.runIn(secondsLater, lockDoor)
                            }
                        }
                    }
                }
            

	})
