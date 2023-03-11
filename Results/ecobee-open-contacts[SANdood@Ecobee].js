
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorOpened', (context, event) => {
        
                this.LOG("sensorOpened() entered with evt: $evt", 5)
                let gotEvent = event.value?.toLowerCase()
                this.LOG("--- Event name received (in lowercase): $gotEvent", 5)
                this.LOG("--- Event data received: ${event.data}", 5)
                this.LOG("--- Event descriptionText: ${event.descriptionText}", 5)
                this.LOG("--- Event device: ${event.device}", 5)
                this.LOG("--- Event deviceId: ${event.deviceId}", 5)
                if (state.openedState == 'closed_pending') {
                    state.openedState = 'opened'
                    try {
                        this.unschedule(closedScheduledActions)
                    } 
                    catch (Exception e) {
                        this.LOG("Failed to unschedule, possibly nothing scheduled. $e", 4)
                    } 
                } else {
                    if (state.openedState == 'closed' || state.openedState == 'closed_pending') {
                        state.openedState = 'open_pending'
                        try {
                            this.unschedule(closedScheduledActions)
                        } 
                        catch (Exception e) {
                            this.LOG("Failed to unschedule, possibly nothing scheduled. $e", 4)
                        } 
                        java.lang.Integer delay = settings.offDelay?.toInteger()
                        this.LOG("The off delay is $delay from ${settings.offDelay}", 5)
                        if (delay > 0) {
                            this.LOG('Delay is greater than zero (0)', 5)
                            this.runIn(delay * 60, openedScheduledActions)
                        } else {
                            if (delay == 0) {
                                this.turnoffHVAC()
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('sensorClosed', (context, event) => {
        
                this.LOG("sensorClosed() entered with evt: $evt", 5)
                let gotEvent = event.value?.toLowerCase()
                this.LOG("Event name received (in lowercase): $gotEvent", 5)
                if (this.allClosed() == true) {
                    if (state.openedState == 'open_pending') {
                        state.openedState = 'closed'
                        try {
                            this.unschedule(openedScheduledActions)
                        } 
                        catch (Exception e) {
                            this.LOG("Failed to unschedule, possibly nothing scheduled. $e", 4)
                        } 
                    } else {
                        this.LOG('All Contact Sensors are now closed, initiating actions.', 5)
                        state.openedState = 'closed_pending'
                        try {
                            this.unschedule(openedScheduledActions)
                        } 
                        catch (Exception e) {
                            this.LOG("Failed to unschedule, possibly nothing scheduled. $e", 4)
                        } 
                        java.lang.Integer delay = settings.onDelay?.toInteger()
                        this.LOG("The on delay is $delay from ${settings.onDelay}", 5)
                        if (delay > 0) {
                            this.LOG('Delay is on greater than zero (0)', 5)
                            this.runIn(delay * 60, closedScheduledActions)
                        } else {
                            if (delay == 0) {
                                this.LOG('Delay is zero, turning on now...', 5)
                                this.turnonHVAC()
                            }
                        }
                    }
                } else {
                    this.LOG('Some Contact Sensors are still open, no action to perform yet...', 5)
                }
            

	})
