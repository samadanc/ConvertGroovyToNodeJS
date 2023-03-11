
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'realtimeHSMChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'realtimeModeChangeHandler')

    })

    .subscribedEventHandler('realtimeHSMChangeHandler', (context, event) => {
        
                if (!pushHSM) {
                    return null
                }
                let newState = event.value
                let hsmToSHM = ['armAway': settings?.armAway, 'armHome': settings?.armHome, 'armNight': settings?.armNight, 'disarm': 'off']
                let hsmState = hsmToSHM.find({ 
                    it.value == newState 
                })?.key
                if (hsmState) {
                    if (enableDebug) {
                        console.log("Sending SHM to HSM state change event to server: $newState to $hsmState")
                    }
                    this.sendGetCommand("/hsm/set/${URLEncoder.encode(hsmState)}")
                } else {
                    if (enableDebug) {
                        console.log("Error sending SHM to HSM state change to server: $hsmState is not mapped to $newState.")
                    }
                }
            

	})

    .subscribedEventHandler('realtimeModeChangeHandler', (context, event) => {
        
                if (!pushModes) {
                    return null
                }
                let newMode = event.value
                if (enableDebug) {
                    console.log("Sending mode change event to server: $newMode")
                }
                this.sendGetCommand("/modes/set/${URLEncoder.encode(newMode)}")
            

	})
