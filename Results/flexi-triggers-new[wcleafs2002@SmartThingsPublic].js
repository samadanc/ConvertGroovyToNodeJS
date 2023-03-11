
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('checkHome', (context, event) => {
        
                let result = false
                if (this.allPeopleHome()) {
                    result = true
                    console.log('allHome is true')
                }
                return result 
            

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                let currentMode = location.mode
                log.trace("${app.label}'s selected modes are $xModes.  Current mode is $currentMode.")
                if (xModes.contains(currentMode)) {
                    log.trace("onContact:  Current mode of $currentMode is within ${app.label}'s selected modes}.")
                    let theSensor = motions.find({ 
                        it.id == event.deviceId
                    })
                    if (checkHome) {
                        if (event.value == 'open') {
                            log.trace("${theSensor.label} opened -- resetting state.inactiveAt to null & calling turnON().")
                            state.inactiveAt = null
                            this.turnON()
                            state.abortWindow = null
                        } else {
                            log.trace("${theSensor.label} closed -- setting state.inactiveAt to ${this.now()}.")
                            state.inactiveAt = this.now()
                            this.setActiveAndSchedule()
                        }
                    } else {
                        console.log('Contact event, but checkHome is not true.')
                    }
                

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                let currentMode = location.mode
                log.trace("${app.label}'s selected modes are $xModes.  Current mode is $currentMode.")
                if (xModes.contains(currentMode)) {
                    log.trace("onMotion:  Current mode of $currentMode is within ${app.label}'s selected modes}.")
                    let theSensor = motions.find({ 
                        it.id == event.deviceId
                    })
                    if (checkHome) {
                        if (event.value == 'active') {
                            log.trace("${theSensor.label} detected motion - resetting state.inactiveAt to null & calling turnON().")
                            state.inactiveAt = null
                            this.turnON()
                            state.abortWindow = null
                        } else {
                            if (event.value == 'inactive') {
                                log.trace("${theSensor.label} detected NO motion.")
                                state.inactiveAt = this.now()
                                log.trace("- setting state.inactiveAt to $now.")
                                if (state.timeOfAbort) {
                                    log.trace('...but abort active.')
                                } else {
                                    log.trace('....and running setActiveAndSchedule.')
                                    this.setActiveAndSchedule()
                                }
                            }
                        }
                    } else {
                        log.trace('Motion event, but checkHome is not true.')
                    }
                

	})

    .subscribedEventHandler('levelCheck', (context, event) => {
        
                let phyTest = event.isPhysical()
                if (phyTest) {
                    hues?.each({ 
                        console.log("Detected manual switch used - adjusting ${it.label} to current Scene settings.")
                        let theLight = hues.find({ 
                            it.id == event.deviceId
                        })
                        log.trace("LevelCheck: The switch for $theLight was physically turned on.")
                        this.pause(1000)
                        this.turnON()
                        state.lastCheck = this.now()
                    })
                }
            

	})
