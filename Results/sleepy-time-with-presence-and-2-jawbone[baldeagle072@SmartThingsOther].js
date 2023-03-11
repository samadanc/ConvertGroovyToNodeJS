
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('jawboneHandler2', (context, event) => {
        
                this.jawboneHandler(presence2, presence1, jawbone1, evt)
            

	})

    .subscribedEventHandler('jawboneHandler', (context, event) => {
        
                let primaryPresenceValue = primaryPresence.latestValue('presence')
                let secondaryPresenceValue = secondaryPresence.latestValue('presence')
                console.log("In Jawbone Event Handler, Event Name = ${event.name}, Value = ${event.value}")
                if (primaryPresenceValue == 'present') {
                    console.log('User Present')
                    if (event.value == 'sleeping') {
                        if (secondaryPresenceValue == 'present') {
                            if (event.value == secondaryJawbone.latestValue('sleeping')) {
                                this.sendNotificationEvent("Sleepy Time performing "$sleepPhrase" for you as requested.")
                                console.log("Sleepy Time performing "$sleepPhrase" for you as requested.")
                                location.helloHome.execute(settings.sleepPhrase)
                            } else {
                                console.log('Second person not asleep')
                            }
                        } else {
                            this.sendNotificationEvent("Sleepy Time performing "$sleepPhrase" for you as requested.")
                            console.log("Sleepy Time performing "$sleepPhrase" for you as requested.")
                            location.helloHome.execute(settings.sleepPhrase)
                        }
                    } else {
                        if (wakePhrase) {
                            this.sendNotificationEvent("Sleepy Time performing "$wakePhrase" for you as requested.")
                            console.log("Sleepy Time performing "$wakePhrase" for you as requested.")
                            location.helloHome.execute(settings.wakePhrase)
                        }
                        wakeOnSwitches?.on()
                    }
                } else {
                    console.log('User Not Present')
                }
            

	})

    .subscribedEventHandler('jawboneHandler1', (context, event) => {
        
                this.jawboneHandler(presence1, presence2, jawbone2, evt)
            

	})
