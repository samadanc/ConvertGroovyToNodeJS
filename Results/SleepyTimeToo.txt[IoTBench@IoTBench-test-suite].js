
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('jawboneHandler', (context, event) => {
        
                console.log("In Jawbone Event Handler, Event Name = ${event.name}, Value = ${event.value}")
                if (presence1.latestValue('presence') == 'present') {
                    if (event.value == 'sleeping') {
                        this.sendNotificationEvent("Sleepy Time performing "$sleepPhrase" for you as requested.")
                        location.helloHome.execute(settings.sleepPhrase)
                    } else {
                        this.sendNotificationEvent("Sleepy Time performing "$wakePhrase" for you as requested.")
                        location.helloHome.execute(settings.wakePhrase)
                    }
                }
            

	})
