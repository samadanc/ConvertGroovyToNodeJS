
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeEvent')

    })

    .subscribedEventHandler('modeChangeEvent', (context, event) => {
        
                Map devActions = deviceActions 
                if (isAutomationEnabled && settings.stModes.find({ 
                    it == location.mode
                }) != null) {
                    if (executionAllowed) {
                        if (parent.isSTModeChangeEnabled) {
                            this.logTrace("Setting ${settings.arloBase} to mode: " + settings."arloMode_$arloBase")
                            let result = parent.setArloMode(settings.arloBase, settings."arloMode_$arloBase")
                            if (settings.notifySendPush) {
                                this.sendPush(settings.notifyCustomText ? settings.notifyCustomText : "${app.label} has ${(result) ? completed : FAILED!} .")
                            }
                            if (devActions.size()) {
                                this.logTrace("modeChangeEvent: Processing device actions for event - ${event.value}...")
                                deviceActions.each({ let propCmd, let deviceIdList ->
                                    deviceIdList?.each({ 
                                        this."$propCmd"(it)
                                        this.pause(500)
                                    })
                                })
                            }
                        } else {
                            this.logWarn('Mode Change Events are Disabled!')
                        }
                    }
                }
            

	})
