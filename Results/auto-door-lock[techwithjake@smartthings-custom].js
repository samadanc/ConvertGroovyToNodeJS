
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                if (lock1.latestValue('lock') == 'unlocked' && event.value == 'unlocked') {
                    this.runIn(minutesLater1 * 60, lockDoor)
                } else {
                    if (lock1.latestValue('lock') == 'locked' && event.value == 'locked') {
                        this.unschedule(lockDoor)
                    }
                }
                if (contact.latestValue('contact') == 'closed' && event.value == 'locked') {
                    this.unschedule(lockDoor)
                } else {
                    if (contact.latestValue('contact') == 'closed' && event.value == 'unlocked') {
                        this.runIn(minutesLater2 * 60, lockDoor)
                    } else {
                        if (lock1.latestValue('lock') == 'unlocked' && event.value == 'closed') {
                            this.runIn(minutesLater2 * 60, lockDoor)
                        }
                    }
                }
            

	})
