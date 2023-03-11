
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
        
                console.log("mode changed to ${event.value}")
                let preset = settings."pressetFor_${event.value}"
                preset = preset.trim()
                if (preset) {
                    console.log("Move Camera to: $preset")
                    theCamera.presetGoName(preset)
                }
            

	})
