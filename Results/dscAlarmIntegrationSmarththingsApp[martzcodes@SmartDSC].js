
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmStatusUpdate')

    })

    .subscribedEventHandler('updateDSC', (context, event) => {
        
                console.log("${event.value}")
                let evtList = "${event.value}".tokenize()
                if ("${evtList[1]}" == '601') {
                    this.updateZoneDevices(zonedevices, "${evtList[0]}", 'alarm')
                }
                if ("${evtList[1]}" == '602') {
                    this.updateZoneDevices(zonedevices, "${evtList[0]}", 'closed')
                }
                if ("${evtList[1]}" == '609') {
                    this.updateZoneDevices(zonedevices, "${evtList[0]}", 'open')
                }
                if ("${evtList[1]}" == '610') {
                    this.updateZoneDevices(zonedevices, "${evtList[0]}", 'closed')
                }
            

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
                console.log("This event name is ${event.name}")
                console.log("The value of this event is ${event.value}")
                console.log("This event happened at ${event.date}")
                console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
                if (lockdisarm == 'Yes') {
                    if (event.descriptionText.contains('Un-Secured by User')) {
                        console.log('Disarming due to door code')
                        if (dscthing) {
                            dscthing.disarm()
                        }
                        if (smartmonitor == 'Yes') {
                            this.setSmartHomeMonitor('off')
                        }
                    }
                }
            

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                console.log("This event name is ${event.name}")
                console.log("The value of this event is ${event.value}")
                console.log("This event happened at ${event.date}")
                console.log("The value of this event is different from its previous value: ${event.isStateChange()}")
                if (event.value == helloDisarm && event.isStateChange) {
                    if (dscthing) {
                        dscthing.disarm()
                    }
                    if (smartmonitor == 'Yes') {
                        this.setSmartHomeMonitor('off')
                    }
                }
                if (event.value == helloArm && event.isStateChange) {
                    if (dscthing) {
                        dscthing.arm()
                    }
                    if (smartmonitor == 'Yes') {
                        this.setSmartHomeMonitor('away')
                    }
                }
                if (event.value == helloNight && event.isStateChange) {
                    if (dscthing) {
                        dscthing.nightarm()
                    }
                    if (smartmonitor == 'Yes') {
                        this.setSmartHomeMonitor('stay')
                    }
                }
            

	})
