
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let msg 
                let createdAt = vehicle.currentEventTripCreatedAt
                String eventType = vehicle.currentEventType
                console.log("eventHandler>event.value=${event.value}, eventType=$eventType")
                let lat = vehicle.currentEventTripLocationLat
                let lon = vehicle.currentEventTripLocationLon
                msg = "AutomaticCarHA>$vehicle vehicle has triggered $eventType event at $createdAt, (lon: $lon, lat: $lat)..."
                console.log(msg)
                if (detailedNotif) {
                    this.send(msg)
                }
                this.check_event(eventType)
            

	})
