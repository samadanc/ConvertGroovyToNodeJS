
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandlerE', (context, event) => {
        
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsE) {
                    state.lastChangedE = this.now()
                }
                if (settings.PersonVPresenceE.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsE.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsE.toInteger() * 60, 'PersonSchedeuleE', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsE.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsE.toInteger() * 60, 'PersonSchedeuleE', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationE && settings.PersonAccelerationE.currentAcceleration == 'active') {
                            atomicState.statusE = atomicState.statusE + 1
                        }
                        if (settings.PersonMotionE && settings.PersonMotionE.currentMotion == 'active') {
                            atomicState.statusE = atomicState.statusE + 1
                        }
                        if (settings.PersonContactE && settings.PersonContactE.currentContact == settings.PersonContactDetailsE) {
                            atomicState.statusE = atomicState.statusE + 1
                        }
                        if (atomicState.statusE == 0) {
                            this.unschedule(PersonMotionSchedeuleE)
                            PersonVPresenceE.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceE.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceE.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceE.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsE || event.name == 'lock' && event.value == 'unlocked' && event.descriptionText.contains("$PersonLockDetailsE") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceE.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceE.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceE.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceE.name} is present due to ${event.name}")
                    }
                }
            

	})

    .subscribedEventHandler('eventHandlerB', (context, event) => {
        
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsB) {
                    state.lastChangedB = this.now()
                }
                if (settings.PersonVPresenceB.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsB.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsB.toInteger() * 60, 'PersonSchedeuleB', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsB.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsB.toInteger() * 60, 'PersonSchedeuleB', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationB && settings.PersonAccelerationB.currentAcceleration == 'active') {
                            atomicState.statusB = atomicState.statusB + 1
                        }
                        if (settings.PersonMotionB && settings.PersonMotionB.currentMotion == 'active') {
                            atomicState.statusB = atomicState.statusB + 1
                        }
                        if (settings.PersonContactB && settings.PersonContactB.currentContact == settings.PersonContactDetailsB) {
                            atomicState.statusB = atomicState.statusB + 1
                        }
                        if (atomicState.statusB == 0) {
                            this.unschedule(PersonMotionSchedeuleB)
                            PersonVPresenceB.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceB.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceB.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceB.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsB || event.name == 'lock' && event.value == 'unlocked' && event.descriptionText.contains("$PersonLockDetailsB") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceB.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceB.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceB.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceB.name} is present due to ${event.name}")
                    }
                }
            

	})

    .subscribedEventHandler('eventHandlerC', (context, event) => {
        
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsC) {
                    state.lastChangedC = this.now()
                }
                if (settings.PersonVPresenceC.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsC.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsC.toInteger() * 60, 'PersonSchedeuleC', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsC.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsC.toInteger() * 60, 'PersonSchedeuleC', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationC && settings.PersonAccelerationC.currentAcceleration == 'active') {
                            atomicState.statusC = atomicState.statusC + 1
                        }
                        if (settings.PersonMotionC && settings.PersonMotionC.currentMotion == 'active') {
                            atomicState.statusC = atomicState.statusC + 1
                        }
                        if (settings.PersonContactC && settings.PersonContactC.currentContact == settings.PersonContactDetailsC) {
                            atomicState.statusC = atomicState.statusC + 1
                        }
                        if (atomicState.statusC == 0) {
                            this.unschedule(PersonMotionSchedeuleC)
                            PersonVPresenceC.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceC.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceC.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceC.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsC || event.name == 'lock' && event.descriptionText.contains("$PersonLockDetailsC") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceC.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceC.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceC.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceC.name} is present due to ${event.name}")
                    }
                }
            

	})

    .subscribedEventHandler('eventHandlerD', (context, event) => {
        
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsD) {
                    state.lastChangedD = this.now()
                }
                if (settings.PersonVPresenceD.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsD.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsD.toInteger() * 60, 'PersonSchedeuleD', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsD.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsD.toInteger() * 60, 'PersonSchedeuleD', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationD && settings.PersonAccelerationD.currentAcceleration == 'active') {
                            atomicState.statusD = atomicState.statusD + 1
                        }
                        if (settings.PersonMotionD && settings.PersonMotionD.currentMotion == 'active') {
                            atomicState.statusD = atomicState.statusD + 1
                        }
                        if (settings.PersonContactD && settings.PersonContactD.currentContact == settings.PersonContactDetailsD) {
                            atomicState.statusD = atomicState.statusD + 1
                        }
                        if (atomicState.statusD == 0) {
                            this.unschedule(PersonMotionSchedeuleD)
                            PersonVPresenceD.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceD.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceD.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceD.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsD || event.name == 'lock' && event.value == 'unlocked' && event.descriptionText.contains("$PersonLockDetailsD") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceD.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceD.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceD.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceD.name} is present due to ${event.name}")
                    }
                }
            

	})

    .subscribedEventHandler('eventHandlerF', (context, event) => {
        
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsF) {
                    state.lastChangedF = this.now()
                }
                if (settings.PersonVPresenceF.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsF.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsF.toInteger() * 60, 'PersonSchedeuleF', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsF.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsF.toInteger() * 60, 'PersonSchedeuleF', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationF && settings.PersonAccelerationF.currentAcceleration == 'active') {
                            atomicState.statusF = atomicState.statusF + 1
                        }
                        if (settings.PersonMotionF && settings.PersonMotionF.currentMotion == 'active') {
                            atomicState.statusF = atomicState.statusF + 1
                        }
                        if (settings.PersonContactF && settings.PersonContactF.currentContact == settings.PersonContactDetailsF) {
                            atomicState.statusF = atomicState.statusF + 1
                        }
                        if (atomicState.statusF == 0) {
                            this.unschedule(PersonMotionSchedeuleF)
                            PersonVPresenceF.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceF.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceF.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceF.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsF || event.name == 'lock' && event.value == 'unlocked' && event.descriptionText.contains("$PersonLockDetailsF") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceF.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceF.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceF.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceF.name} is present due to ${event.name}")
                    }
                }
            

	})

    .subscribedEventHandler('eventHandlerA', (context, event) => {
        
                atomicState.statusA = 0
                if (event.name == 'contact' && event.value == settings.PersonContactDetailsA) {
                    state.lastChangedA = this.now()
                }
                if (settings.PersonVPresenceA.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsA.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsA.toInteger() * 60, 'PersonSchedeuleA', ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsA.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsA.toInteger() * 60, 'PersonSchedeuleA', ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationA && settings.PersonAccelerationA.currentAcceleration == 'active') {
                            atomicState.statusA = atomicState.statusA + 1
                        }
                        if (settings.PersonMotionA && settings.PersonMotionA.currentMotion == 'active') {
                            atomicState.statusA = atomicState.statusA + 1
                        }
                        if (settings.PersonContactA && settings.PersonContactA.currentContact == settings.PersonContactDetailsA) {
                            atomicState.statusA = atomicState.statusA + 1
                        }
                        console.log("${atomicState.statusA}")
                        if (atomicState.statusA == 0) {
                            this.unschedule(PersonMotionSchedeuleA)
                            PersonVPresenceA.departed()
                            this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceA.name}", 'value': 'absent', 'descriptionText': "${settings.PersonVPresenceA.name} is absent due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                            log.trace("${settings.PersonVPresenceA.name} is absent due to ${event.name}")
                        }
                    }
                } else {
                    if (event.name == 'acceleration' && event.value == 'active' || event.name == 'contact' && event.value == settings.PersonContactDetailsA || event.name == 'lock' && event.value == 'unlocked' && event.descriptionText.contains("$PersonLockDetailsA") || event.name == 'motion' && event.value == 'active' || event.name == 'presence' && event.value == 'present') {
                        PersonVPresenceA.arrived()
                        this.sendEvent(['linkText': app.label, 'name': "${settings.PersonVPresenceA.name}", 'value': 'present', 'descriptionText': "${settings.PersonVPresenceA.name} is present due to ${event.name}", 'eventType': 'SOLUTION_EVENT', 'displayed': true])
                        log.trace("${settings.PersonVPresenceA.name} is present due to ${event.name}")
                    }
                }
            

	})
