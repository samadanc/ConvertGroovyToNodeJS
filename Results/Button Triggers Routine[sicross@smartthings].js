
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                console.log("event: button ${event.value}")
                console.log("event data: ${event.data}")
                if (event.value == 'pushed') {
                    let data = this.parseJson(event.data)
                    console.log("button ${data.buttonNumber} pushed")
                    console.log("stored buttonNumber: $buttonNumber")
                    if (data.buttonNumber) {
                        let buttonNumber = data.buttonNumber.toInteger()
                        if (settings["button_$buttonNumber"]) {
                            let routine = settings["button_$buttonNumber"]
                            console.log('We have a setting for that button!')
                            console.log("Triggering $routine")
                            location.helloHome.execute(routine)
                        } else {
                            console.log('We DO NOT have a setting for that button. Ignoring.')
                        }
                    }
                }
            

	})
