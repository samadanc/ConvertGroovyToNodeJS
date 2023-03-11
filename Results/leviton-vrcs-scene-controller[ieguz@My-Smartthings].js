
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                console.log('buttonEvent')
                if (allOk) {
                    let buttonNumber = event.value
                    console.log("buttonEvent: ${event.name} - (${event.data})")
                    console.log("button: $buttonNumber")
                    let recentEvents = buttonDevice.eventsSince(new Date(this.now() - 3000)).findAll({ 
                        it.value == event.value && it.data == event.data
                    })
                    console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
                    if (recentEvents.size <= 1) {
                        switch ( buttonNumber ) {
                            case ~('.*1.*') :
                                this.executeHandlers(1)
                                break
                            case ~('.*2.*') :
                                this.executeHandlers(2)
                                break
                            case ~('.*3.*') :
                                this.executeHandlers(3)
                                break
                            case ~('.*4.*') :
                                this.executeHandlers(4)
                                break
                        }
                    } else {
                        console.log("Found recent button press events for $buttonNumber with value $value")
                    }
                } else {
                    console.log('NotOK')
                }
            

	})
