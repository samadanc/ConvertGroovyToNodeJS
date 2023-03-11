
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
        
                if (event.value == 'away') {
                    console.log('Smart Home Monitor is set to Away, Performing ArmAway')
                    this.armAway()
                } else {
                    if (event.value == 'stay') {
                        console.log('Smart Home Monitor is set to Night, Performing ArmStay')
                        this.armStay()
                    } else {
                        if (event.value == 'off') {
                            console.log('Smart Home Monitor is set to Home, Performing Disarm')
                            this.disarm()
                        }
                    }
                }
            

	})
