
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
                if (event.value == 'present') {
                    if (state.garageDoorShouldOpen[event.displayName].status && garageDoor.currentDoor == 'closed' || garageDoor.currentDoor == 'closing') {
                        this.openDoor(event.displayName)
                        state.garageDoorShouldOpen[event.displayName].status = false
                    }
                } else {
                    state.garageDoorShouldOpen[event.displayName].timestamp = Calendar.getInstance(location.timeZone, Locale.US).getTimeInMillis()
                    console.log("${state.garageDoorShouldOpen[event.displayName]}")
                    if (garageDoor.currentDoor == 'closed') {
                        console.log('Catching a potential false positive.')
                        this.runIn(60 * threshold , checkStatus)
                    } else {
                        if (garageDoor.currentDoor != 'unknown') {
                            console.log("Garage door will open when ${event.displayName} arrives.")
                            state.garageDoorShouldOpen[event.displayName].status = true
                            if (garageDoor.currentDoor == 'open') {
                                this.closeDoor(event.displayName)
                            }
                        }
                    }
                }
            

	})
