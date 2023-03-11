
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
                if (contact.latestValue('contact') == 'open' && event.value == 'locked') {
                    this.runIn(secondsLater, unlockDoor)
                } else {
                    if (contact.latestValue('contact') == 'open' && event.value == 'unlocked') {
                        this.unschedule(unlockDoor)
                    } else {
                        if (contact.latestValue('contact') == 'closed' && event.value == 'locked') {
                            this.unschedule(lockDoor)
                        } else {
                            if (contact.latestValue('contact') == 'closed' && event.value == 'unlocked') {
                                this.runIn(minutesLater * 60, lockDoor)
                            } else {
                                if (lock1.latestValue('lock') == 'unlocked' && event.value == 'open') {
                                    this.unschedule(lockDoor)
                                } else {
                                    if (lock1.latestValue('lock') == 'unlocked' && event.value == 'closed') {
                                        this.runIn(minutesLater * 60, lockDoor)
                                    } else {
                                        console.log('Unlocking the door.')
                                        lock1.unlock()
                                        if (location.contactBookEnabled) {
                                            if (recipients) {
                                                console.log('Sending Push Notification...')
                                                this.sendNotificationToContacts("$lock1 unlocked after $contact was opened or closed when $lock1 was locked!", recipients)
                                            }
                                        }
                                        if (phoneNumber) {
                                            console.log('Sending text message...')
                                            this.sendSms(phoneNumber, "$lock1 unlocked after $contact was opened or closed when $lock1 was locked!")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
