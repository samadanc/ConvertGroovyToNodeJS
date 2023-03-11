
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('opStateHandler', (context, event) => {
        
                this.LOG("${event.name}: ${event.value}", 2, null, 'info')
                if (event.value == 'idle') {
                    if (reverseOnIdle) {
                        let isReallyIdle = true
                        if (theThermostats.size() > 1) {
                            theThermostats.each({ 
                                if (it.currentValue('thermostatOperatingState') != 'idle') {
                                    isReallyIdle = false
                                }
                            })
                        }
                        if (isReallyIdle) {
                            if (theOnSwitches) {
                                this.LOG("Turning off ${theOnSwitches.displayName}", 2, null, 'info')
                                theOnSwitches*.off()
                            }
                            if (theOnDimmers) {
                                this.dimmersOff(theOnDimmers)
                            }
                            if (theOffSwitches) {
                                this.LOG("Turning on ${theOffSwitches.displayName}", 2, null, 'info')
                                theOffSwitches*.on()
                            }
                            if (theOffDimmers) {
                                this.dimmersOn(theOffDimmers)
                            }
                        }
                        return null
                    }
                }
                if (settings.theOpState.contains(event.value)) {
                    if (theOnSwitches) {
                        this.LOG("Turning on ${theOnSwitches.displayName}", 2, null, 'info')
                        theOnSwitches*.on()
                    }
                    if (theOnDimmers) {
                        this.dimmersOn(theOnDimmers)
                    }
                    if (theOffSwitches) {
                        this.LOG("Turning off ${theOffSwitches.displayName}", 2, null, 'info')
                        theOffSwitches*.off()
                    }
                    if (theOffDimmers) {
                        this.dimmersOff(theOffDimmers)
                    }
                }
            

	})
