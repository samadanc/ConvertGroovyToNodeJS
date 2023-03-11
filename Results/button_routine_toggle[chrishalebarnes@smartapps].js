
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonHandler', (context, event) => {
        
                let data = this.parseJson(event.data)
                let buttonName = data.buttonNumber == '1' && settings['buttonOnAction'] || settings['buttonOffAction'] ? 'button' : "button${data.buttonNumber}"
                if (state[ buttonName ] == 'on') {
                    console.log("Executing $buttonNameOffAction")
                    location.helloHome?.execute(settings["$buttonNameOffAction"])
                    state[ buttonName ] = 'off'
                } else {
                    if (state[ buttonName ] == 'off') {
                        console.log("Executing $buttonNameOnAction")
                        location.helloHome?.execute(settings["$buttonNameOnAction"])
                        state[ buttonName ] = 'on'
                    }
                }
            

	})
