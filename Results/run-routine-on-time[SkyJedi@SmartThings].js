
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('timedRoutine', delay);

    })

    .scheduledEventHandler('timedRoutine', (context, event) => {
        
                console.log("settings.modes: $allowedModes  Current Mode: $currMode")
                if (settings.modes.contains(location.currentMode)) {
                    location.helloHome?.execute(settings.routine)
                    console.log("timedRoutine called at ${new Date()}")
                } else {
                    console.log("timedRoutine not called due to Mode ${settings.modes}")
                }
            

	})
