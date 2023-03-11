
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                switch (event.value) {
                    case 'active':
                        console.log('motionHandler: motion detector active - canceling any scheduled timer event')
                        this.unschedule('timeoutHandler')
                        break
                    case 'inactive':
                        let secs = idleMinutes * 60
                        console.log("motionHandler: motion detector inactive - scheduling timer event for $secs secs")
                        this.runIn(secs, timeoutHandler)
                        break
                    default: 
                    log.error("motionHandler: bad event value ${event.value}")
                }
            

	})
