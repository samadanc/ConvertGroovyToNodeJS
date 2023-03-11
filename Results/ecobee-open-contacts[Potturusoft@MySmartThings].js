
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorOpened', (context, event) => {
        
                this.LOG("sensorOpened() entered with event ${evt?.device} ${evt?.name}: ${evt?.value}", 3, null, 'trace')
                let HVACModeState = atomicState.HVACModeState
                if (HVACModeState == 'off' || state.openedState == 'off_pending') {
                    return null
                }
                java.lang.Integer delay = settings.onDelay ? settings.onDelay : 0.toInteger()
                if (HVACModeState == 'resume_pending') {
                    atomicState.openedState = 'off'
                    if (delay > 0) {
                        this.unschedule('turnOnHVAC')
                    }
                    return null
                }
                atomicState.HVACModeState = 'off_pending'
                delay = settings.offDelay ? settings.offDelay : 5.toInteger()
                if (delay > 0) {
                    this.runIn(delay * 60, 'turnOffHVAC')
                } else {
                    this.turnOffHVAC()
                }
            

	})

    .subscribedEventHandler('sensorClosed', (context, event) => {
        
                this.LOG("sensorClosed() entered with event ${evt?.device} ${evt?.name}: ${evt?.value}", 3, null, 'trace')
                let HVACModeState = atomicState.HVACModeState
                if (this.allClosed() == true) {
                    if (HVACModeState.contains('on')) {
                        return null
                    }
                    java.lang.Integer delay = settings.offDelay ? settings.offDelay : 5.toInteger()
                    if (HVACModeState == 'off_pending') {
                        atomicState.HVACModeState = 'on'
                        if (delay != 0) {
                            this.unschedule('turnOffHVAC')
                        }
                        return null
                    }
                    this.LOG('All Contact Sensors & Switches are reset, initiating actions.', 5, null, 'trace')
                    atomicState.HVACModeState = 'on_pending'
                    this.unschedule(openedScheduledActions)
                    delay = settings.onDelay ? settings.onDelay : 0.toInteger()
                    this.LOG("The on delay is $delay", 5, null, 'info')
                    if (delay > 0) {
                        this.runIn(delay * 60, 'turnOnHVAC')
                    } else {
                        this.turnOnHVAC()
                    }
                } else {
                    this.LOG('No action to perform yet...', 5, null, 'trace')
                }
            

	})

    .subscribedEventHandler('statModeChange', (context, event) => {
        
                if (event.value == 'off') {
                    if (atomicState.HVACModeState != 'off') {
                        atomicState.HVACModeState = 'off'
                    }
                } else {
                    if (atomicState.HVACModeState != 'on') {
                        atomicState.HVACModeState = 'on'
                    }
                }
                let tmpThermSavedState = atomicState.thermSavedState
                tmpThermSavedState[event.device.id] = event.value
                atomicState.thermSavedState = tmpThermSavedState 
            

	})
