
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('bulbHandler', (context, event) => {
        
                if (event.value == 'on') {
                    this.onBulb()
                } else {
                    if (theSwitch.currentSwitch == 'on') {
                        this.onBulb()
                    } else {
                        this.offBulb()
                    }
                }
            

	})
