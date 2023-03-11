
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('jawboneHandler', (context, event) => {
        
                console.log("In Jawbone Event Handler, Event Name = ${event.name}, Value = ${event.value}, Current Mode = ${location.mode}, Sleep Phrase = $sleepPhrase, Wake Phrase = $wakePhrase, Ignore Mode = $ignoreMode")
                if (location.mode == ignoreMode ) {
                    console.log('Jawbone Control - Jawbone event ignored since system is in an ignored mode.')
                    this.sendNotificationEvent("Jawbone Control not performing any tasks since you requested sleep changes to be ignored in $ignoreMode mode.")
                } else {
                    if (event.value == 'sleeping') {
                        this.sendNotificationEvent("Jawbone Control performing "$sleepPhrase" for you as requested.")
                        location.helloHome.execute(settings.sleepPhrase)
                    } else {
                        this.sendNotificationEvent("Jawbone Control performing "$wakePhrase" for you as requested.")
                        location.helloHome.execute(settings.wakePhrase)
                    }
                }
            

	})
