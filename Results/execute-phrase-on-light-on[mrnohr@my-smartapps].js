
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('lightHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                location.helloHome.execute(phrase)
                this.runIn(60 * 5, turnOffLight)
            

	})
