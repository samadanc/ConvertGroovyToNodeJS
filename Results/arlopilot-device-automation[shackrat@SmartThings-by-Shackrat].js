
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceDepartEvent', (context, event) => {
        
                this.logTrace('Processing departure event...')
                let someoneHome = settings.stPresenceArrive.find({ 
                    it.currentPresence == 'present'
                })
                if (isAutomationEnabled && event.value == 'present' && !someoneHome) {
                    this.doArloModeChange()
                }
            

	})

    .subscribedEventHandler('presenceArriveEvent', (context, event) => {
        
                this.logTrace('Processing arrival event...')
                let someoneArrived = settings.stPresenceArrive.find({ 
                    it.currentPresence == 'present'
                })
                if (isAutomationEnabled && event.value == 'present' && someoneArrived ) {
                    this.doArloModeChange()
                }
            

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                if (isAutomationEnabled && event.value == 'pushed') {
                    if (executionAllowed) {
                        this.doArloModeChange()
                    }
                }
            

	})

    .subscribedEventHandler('switchEvent', (context, event) => {
        
                if (isAutomationEnabled && event.value == 'on' || event.value == 'off') {
                    if (executionAllowed) {
                        this.doArloModeChange()
                    }
                }
            

	})
