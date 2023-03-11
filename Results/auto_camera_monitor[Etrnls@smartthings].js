
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presence', (context, event) => {
        
                log.trace("presence(${event.value})")
                if (event.value == 'present') {
                    console.log('Turning motion monitoring off')
                    cameras.motionOff()
                    this.sendPush('Camera motion monitoring off')
                } else {
                    if (presences.find({ 
                        it.currentPresence == 'present'
                    }) == null) {
                        console.log('Turning motion monitoring on')
                        cameras.motionOn()
                        this.sendPush('Camera motion monitoring on')
                    }
                }
            

	})
