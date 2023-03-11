
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('checkForSunHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('windowShadeHandler', (context, event) => {
        
                console.log("WindowShade event occured: value => '${event.value}'")
            

	})

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
                this.unschedule(checkForSunHandler)
            

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
                this.resetState()
                this.runEvery10Minutes(checkForSunHandler)
            

	})

    .scheduledEventHandler('checkForSunHandler', (context, event) => {
        
                console.log("checkForSunHandler called at ${new Date()}")
                let sunPosition = this.getSunPosition(location.latitude, location.longitude, new Date())
                z_blinds.each({ let windowShade ->
                    console.log("Checking action for windowShade '${windowShade.displayName}'")
                    if (this.isAngleBetweenRange(sunPosition.azimuth, this.getShadingRangeSetting(windowShade.id))) {
                        console.log("Sun matches direction of windowShade '${windowShade.displayName}'")
                        if (state.windowShadeStates[windowShade.id] != 'Closed') {
                            console.log("execution 'close' command for windowShade '${windowShade.displayName}'")
                            windowShade.close()
                            state.windowShadeStates[windowShade.id] = 'Closed'
                            if (sendPush) {
                                this.sendPush("Closed ${windowShade.displayName}!")
                            }
                        }
                    } else {
                        console.log("WindowShade '${windowShade.displayName}' does not need protection. No sun.")
                    }
                })
            

	})
