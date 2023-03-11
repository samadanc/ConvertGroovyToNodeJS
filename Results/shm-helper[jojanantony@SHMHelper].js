
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                console.log("SHMHelper  alarm status changed to: ${event.value}")
                if (event.value == 'away') {
                    location.helloHome?.execute(settings.armRoutine)
                    this.sendMsg("${location.name} is Armed-Away")
                } else {
                    if (event.value == 'stay') {
                        location.helloHome?.execute(settings.stayRoutine)
                        this.sendMsg("${location.name} is Armed-Stay")
                    } else {
                        if (event.value == 'off') {
                            location.helloHome?.execute(settings.disarmRoutine)
                            this.sendMsg("${location.name} is Disarmed")
                        }
                    }
                }
            

	})
