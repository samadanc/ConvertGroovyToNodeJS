
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('hubStatusHandler', (context, event) => {
        
                this.logInfo("Hub Event! ${event.displayName} - ${event.value}.")
                if (event.value == 'zw_radio_on') {
                    this.sendPush("${event.displayName} has an event that caused a Z-Wave restart.")
                }
                if (event.value == 'zb_radio_on') {
                    this.sendPush("${event.displayName} has an event that caused a Zigbee restart.")
                }
            

	})
