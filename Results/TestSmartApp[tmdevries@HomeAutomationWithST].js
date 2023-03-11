
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                if (this.isUnhindered() && !(this.isOverridden())) {
                    console.log("Everything ok, turing $aSwitch on")
                    aSwitch.on()
                }
            

	})
