
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandlerE', (context, event) => {
        
                if (settings.PersonVPresenceE.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsE.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsE.toInteger() * 60, PersonSchedeuleE, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsE.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsE.toInteger() * 60, PersonSchedeuleE, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationE != 'active' && settings.PersonMotionE != 'active' && settings.PersonContactE != settings.PersonContactDetailsE) {
                            this.unschedule(PersonSchedeuleE)
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
        
                if (settings.PersonVPresenceB.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsB.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsB.toInteger() * 60, PersonSchedeuleB, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsB.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsB.toInteger() * 60, PersonSchedeuleB, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationB != 'active' && settings.PersonMotionB != 'active' && settings.PersonContactB != settings.PersonContactDetailsB) {
                            this.unschedule(PersonSchedeuleB)
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
        
                if (settings.PersonVPresenceC.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsC.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsC.toInteger() * 60, PersonSchedeuleC, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsC.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsC.toInteger() * 60, PersonSchedeuleC, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationC != 'active' && settings.PersonMotionC != 'active' && settings.PersonContactC != settings.PersonContactDetailsC) {
                            this.unschedule(PersonSchedeuleC)
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
        
                if (settings.PersonVPresenceD.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsD.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsD.toInteger() * 60, PersonSchedeuleD, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsD.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsD.toInteger() * 60, PersonSchedeuleD, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationD != 'active' && settings.PersonMotionD != 'active' && settings.PersonContactD != settings.PersonContactDetailsD) {
                            this.unschedule(PersonSchedeuleD)
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
        
                if (settings.PersonVPresenceF.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsF.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsF.toInteger() * 60, PersonSchedeuleF, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsF.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsF.toInteger() * 60, PersonSchedeuleF, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationF != 'active' && settings.PersonMotionF != 'active' && settings.PersonContactF != settings.PersonContactDetailsF) {
                            this.unschedule(PersonSchedeuleF)
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
        
                if (settings.PersonVPresenceA.currentPresence == 'present') {
                    if (event.name == 'acceleration' && event.value == 'inactive' && PersonAccelerationDetailsA.toInteger() > 0) {
                        this.runIn(settings.PersonAccelerationDetailsA.toInteger() * 60, PersonSchedeuleA, ['overwrite': true])
                    }
                    if (event.name == 'motion' && event.value == 'inactive' && PersonMotionDetailsA.toInteger() > 0) {
                        this.runIn(settings.PersonMotionDetailsA.toInteger() * 60, PersonSchedeuleA, ['overwrite': true])
                    }
                    if (event.name == 'presence' && event.value == 'not present') {
                        if (settings.PersonAccelerationA != 'active' && settings.PersonMotionA != 'active' && settings.PersonContactA != settings.PersonContactDetailsA) {
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
