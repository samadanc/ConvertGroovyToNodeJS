
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                console.log("<I'm awake> switchHandler: $evt")
                if (allOk) {
                    if (awakePhrase) {
                        console.log("<I'm awake> executing: $awakePhrase")
                        this.executePhrase(awakePhrase)
                    }
                }
            

	})
