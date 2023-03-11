
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
                console.log('Kicthen Control: buttonEvent')
                let buttonNumber = event.jsonData.buttonNumber
                let firstEventId = 0
                let value = event.value
                console.log("buttonEvent: ${event.name} = ${event.value} (${event.data})")
                let recentEvents = buttonDevice.eventsSince(new Date(this.now() - 3000)).findAll({ 
                    it.value == event.value && it.data == event.data
                })
                console.log("Kicthen Control: Found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past 3 seconds")
                if (recentEvents.size() != 0) {
                    console.log("Kicthen Control: First Event ID: ${recentEvents[0].id}")
                    firstEventId = recentEvents[0].id
                } else {
                    firstEventId = 0
                }
                console.log("Kicthen Control: This Event ID: ${event.id}")
                if (firstEventId == event.id) {
                    switch ( buttonNumber ) {
                        case ~('.*1.*') :
                            this.button1Handlers()
                            break
                        case ~('.*2.*') :
                            this.button2Handlers()
                            break
                        case ~('.*3.*') :
                            this.button3Handlers()
                            break
                        case ~('.*4.*') :
                            this.button4Handlers()
                            break
                        case ~('.*5.*') :
                            this.button5Handlers()
                            break
                        case ~('.*6.*') :
                            this.button6Handlers()
                            break
                        case ~('.*7.*') :
                            this.button7Handlers()
                            break
                        case ~('.*8.*') :
                            this.button8Handlers()
                            break
                    }
                } else {
                    if (firstEventId == 0) {
                        console.log('Kicthen Control: No events found. Possible SmartThings latency')
                    } else {
                        console.log('Kicthen Control: Duplicate button press found. Not executing handlers')
                    }
                }
            

	})

    .subscribedEventHandler('pontEvent', (context, event) => {
        
                console.log("Kicthen Control: Pont - ${event.name}: ${event.value}")
                if (atomicState.noPontEvent) {
                    console.log('Kicthen Control: Event sent by the app, nothing to do')
                    atomicState.noPontEvent = false
                } else {
                    if (event.value == 'on') {
                        console.log('Kicthen Control: Turn On strip')
                        strip.offBlue()
                        strip.offRed()
                        strip.offGreen()
                        strip.setLevelWhite(100)
                    } else {
                        console.log('Kicthen Control: Turn Off strip')
                        strip.off()
                    }
                }
            

	})

    .subscribedEventHandler('virtualOffEvent', (context, event) => {
        
                console.log("Kitchen Control: Virtual Controller - ${event.name}: ${event.value}")
                if (event.value == 'off') {
                    if (atomicState.colorChangeMode != 0) {
                        atomicState.colorChangeMode = 0
                        strip.off()
                        top.off()
                    }
                    atomicState.noPontEvent = false
                }
            

	})

    .subscribedEventHandler('virtualLevelEvent', (context, event) => {
        
                console.log("Kitchen Control: Virtual Controller - ${event.name}: ${event.value}")
                if (atomicState.noVirtualEvent) {
                    console.log('Kicthen Control: Event sent by the app, nothing to do')
                    atomicState.noVirtualEvent = false
                } else {
                    let level = Integer.parseInt(event.value)
                    if (level == 1 || level >= 10 && level <= 19) {
                        atomicState.noVirtualEvent = true
                        virtualController.setLevel(99)
                        this.button1Handlers()
                    } else {
                        if (level == 4 || level >= 20 && level <= 29) {
                            atomicState.noVirtualEvent = true
                            virtualController.setLevel(99)
                            this.button2Handlers()
                        } else {
                            if (level == 2 || level >= 30 && level <= 39) {
                                atomicState.noVirtualEvent = true
                                virtualController.setLevel(99)
                                this.button3Handlers()
                            } else {
                                if (level == 5 || level >= 40 && level <= 49) {
                                    atomicState.noVirtualEvent = true
                                    virtualController.setLevel(99)
                                    this.button4Handlers()
                                } else {
                                    if (level == 3 || level >= 50 && level <= 59) {
                                        this.button5Handlers()
                                        atomicState.noVirtualEvent = true
                                        virtualController.setLevel(99)
                                    } else {
                                        if (level == 6 || level >= 60 && level <= 69) {
                                            atomicState.noVirtualEvent = true
                                            virtualController.setLevel(99)
                                            this.button6Handlers()
                                        } else {
                                            if (level == 7 || level >= 70 && level <= 79) {
                                                atomicState.noVirtualEvent = true
                                                virtualController.setLevel(99)
                                                this.button7Handlers()
                                            } else {
                                                if (level == 92) {
                                                    atomicState.noVirtualEvent = true
                                                    this.colorChangeMode(1)
                                                    virtualController.setLevel(99)
                                                } else {
                                                    if (level == 93) {
                                                        this.colorChangeMode(2)
                                                    } else {
                                                        if (level == 94) {
                                                            this.colorChangeMode(3)
                                                        } else {
                                                            if (level == 95) {
                                                                this.colorChangeMode(4)
                                                            } else {
                                                                if (level == 96) {
                                                                    this.colorChangeMode(5)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            

	})
