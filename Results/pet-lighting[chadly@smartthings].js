
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'onSunset')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'onModeChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'onSunrise')

    })

    .subscribedEventHandler('onSunrise', (context, event) => {
        
                if (location.mode == 'Away') {
                    lights.off()
                }
            

	})

    .subscribedEventHandler('onModeChanged', (context, event) => {
        
                if (location.mode == 'Away') {
                    this.runIn(60 * 2, turnOnPetLighting)
                }
            

	})

    .subscribedEventHandler('onSunset', (context, event) => {
        
                this.turnOnPetLighting()
            

	})
