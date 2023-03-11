
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('triggerThrown', (context, event) => {
        
                this.logEvent(evt)
                this.controlLocks()
                this.controlSwitches()
                if (triggerReset) {
                    if (triggerEvent == 'on') {
                        triggerSwitch.off()
                    } else {
                        triggerSwitch.on()
                    }
                }
                this.sendNotifications("${event.displayName} ${event.stringValue.toUpperCase()} at ${location.name}: ${event.date.format(HH:mm:ss.SSSZ, EEE, MM-dd-yyyy, location.timeZone)}", recipients, inPhone, notifyPush)
            

	})
