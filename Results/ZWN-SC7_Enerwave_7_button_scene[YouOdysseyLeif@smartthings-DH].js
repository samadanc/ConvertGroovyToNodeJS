
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
                    let buttonNumber = event.jsonData.buttonNumber
                    let firstEventId = 0
                    let value = event.value
                    console.log("button: $buttonNumber, value: $value")
                    let recentEvents = buttonDevice.eventsSince(new Date(this.now() - debounce )).findAll({ 
                        it.value == event.value && it.data == event.data
                    })
                    console.log("Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past ${(debounce / 1000)} seconds")
                    if (recentEvents.size() != 0) {
                        console.log("First Event ID: ${recentEvents[0].id}")
                        firstEventId = recentEvents[0].id
                    } else {
                        firstEventId = 0
                    }
                    console.log("This Event ID: ${event.id}")
                    if (firstEventId == event.id) {
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
                            case ~('.*5.*') :
                                this.executeHandlers(5)
                                break
                            case ~('.*6.*') :
                                this.executeHandlers(6)
                                break
                            case ~('.*7.*') :
                                this.executeHandlers(7)
                                break
                        }
                    } else {
                        if (firstEventId == 0) {
                            console.log('No events found. Possible SmartThings latency')
                        } else {
                            console.log('Duplicate button press found. Not executing handlers')
                        }
                    }
                } else {
                    console.log('NotOK')
                }
            

	})
