
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('ssdpDiscover', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusHandler')

    })

    .subscribedEventHandler('alarmStatusHandler', (context, event) => {
        
                console.log("Alarm system status is ${event.value}")
                this.getChildDevices().findAll({ 
                    it.name == 'DSC Alarm Partition' && it.integrateSHM()
                }).each({ let partitionDevice ->
                    if (event.value == 'off') {
                        partitionDevice.disarm()
                    } else {
                        if (event.value == 'stay') {
                            partitionDevice.armStay()
                        } else {
                            if (event.value == 'away') {
                                partitionDevice.armAway()
                            }
                        }
                    }
                })
            

	})
