
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                if (allOk) {
                    console.log(event.data)
                    String[] sections = event.data.split(':')
                    console.log("sections: $sections")
                    String payload = sections[1]
                    console.log("Command: $payload")
                    String payload2 = payload.replaceAll('[/}/g]', '')
                    Integer payload3 = payload2.toInteger()
                    let buttonNumber = payload3 
                    let value = event.value
                    console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
                    console.log("button: $buttonNumber, value: $value")
                    this.executeHandlers(buttonNumber, value)
                

	})
