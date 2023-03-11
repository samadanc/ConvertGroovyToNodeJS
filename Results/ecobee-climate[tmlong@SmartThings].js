
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                console.log("modeChangeHandler() event: $event")
                let mode = event.value
                let climateRef = settings[ mode ]
                console.log("modeChangeHandler() mode: $mode, climateRef: $climateRef")
                if (climateRef) {
                    state.currentClimateRef = climateRef 
                    this.holdClimate(state.thermostatIds, settings.holdType, climateRef)
                }
            

	})
