
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
                    console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
                    console.log("button: $buttonNumber, value: $value")
                    console.log("This Event ID: ${event.id}")
                    switch ( buttonNumber ) {
                        case ~('.*1.*') :
                            this.executeHandlers(1, value)
                            break
                        case ~('.*2.*') :
                            this.executeHandlers(2, value)
                            break
                        case ~('.*3.*') :
                            this.executeHandlers(3, value)
                            break
                        case ~('.*4.*') :
                            this.executeHandlers(4, value)
                            break
                        case ~('.*5.*') :
                            this.executeHandlers(5, value)
                            break
                        case ~('.*6.*') :
                            this.executeHandlers(6, value)
                            break
                        case ~('.*7.*') :
                            this.executeHandlers(7, value)
                            break
                    }
                } else {
                    console.log('NotOK')
                }
            

	})
