
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                console.log(event.name)
                console.log(event.value)
                console.log(event.date)
                console.log(event.isStateChange())
                if (event.value == 'open') {
                    this.turnLightOn()
                } else {
                    if (contactInactive) {
                        this.runIn(delay, turnLightOff)
                    }
                }
            

	})
