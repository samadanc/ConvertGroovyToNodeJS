
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('handler', (context, event) => {
        
                console.log("${settings.theSwitch} (${settings.switchState}) triggers routine ${settings.theRoutine}")
                location.helloHome?.execute(settings.theRoutine)
            

	})
