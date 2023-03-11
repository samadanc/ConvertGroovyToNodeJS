
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
                console.log("motionDetectedHandler called: $evt")
                console.log("Device: ${event.device}")
                console.log('Cancelling check.')
                this.unschedule(checkMotion)
                if (this.amIOperating()) {
                    let switchState = theswitch.currentState('switch')
                    console.log("Override = ${atomicState.override}.")
                    console.log("Switch is ${switchState.value}")
                    if (switchState.value == 'off' || atomicState.override) {
                        console.log('Light is off (or we are overriding), so switch it on.')
                        atomicState.wasItMe = true
                        atomicState.switchOnRequested = true
                        atomicState.switchLevelRequested = true
                        let requiredLevel = thelevel 
                        if (atomicState.dimmerLater) {
                            let between = this.timeOfDayIsBetween('00:00', '04:00', new Date(), location.timeZone)
                            console.log("After midnight? $between")
                            if (between) {
                                Float thelevelHalved = thelevel / 2
                                console.log("thelevelHalved $thelevelHalved")
                                Integer thelevelRounded = thelevelHalved.round()
                                console.log("thelevelRounded $thelevelRounded")
                                requiredLevel = thelevelRounded 
                            }
                        }
                        console.log("Setting level to $requiredLevel.")
                        theswitch.setLevel(requiredLevel)
                    } else {
                        console.log('Light is already on, leave it alone.')
                        atomicState.switchOnRequested = false
                        atomicState.switchLevelRequested = false
                    }
                } else {
                    console.log('Not operating.')
                }
            

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
                console.log('Switch turned off.')
                console.log('Cancelling check.')
                if (atomicState.override == false) {
                    this.unschedule(checkMotion)
                }
            

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
                console.log('Switch turned on.')
                console.log("Was it me? ${atomicState.wasItMe}")
                console.log("Did I request this? ${atomicState.switchOnRequested}")
                if (atomicState.switchOnRequested) {
                    console.log('Switched on because of me.')
                    atomicState.switchOnRequested = false
                } else {
                    console.log('Switched on by someone else.')
                    if (atomicState.override == false) {
                        atomicState.wasItMe = false
                    }
                }
            

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
                console.log("motionStoppedHandler called: $evt")
                console.log("Device: ${event.device}")
                console.log("Was it me? ${atomicState.wasItMe}")
                if (atomicState.wasItMe) {
                    let noActive = 0
                    let theListOfSensors 
                    if (themotion2 instanceof List) {
                        theListOfSensors = themotion2 
                    } else {
                        theListOfSensors = [ themotion2 ]
                    }
                    for (let i = 0; i < theListOfSensors.size(); i++) {
                        let currentState = theListOfSensors[ i ].currentState('motion')
                        console.log("Sensor $i, ${currentState.value}.")
                        if (currentState.value == 'active') {
                            console.log('This one is ACTIVE.')
                            noActive++
                        }
                    }
                    console.log("Number of active sensors, $noActive.")
                    if (noActive == 0) {
                        console.log('All sensors are inactive.')
                        console.log('Wait and see if we need to turn it off.')
                        this.runIn(60 * minutes , checkMotion)
                    } else {
                        console.log("Not doing anything yet, $noActive active sensor(s).")
                    }
                } else {
                    console.log('Nothing to do with me.')
                }
            

	})

    .subscribedEventHandler('switchLevelHandler', (context, event) => {
        
                if (atomicState.switchLevelRequested) {
                    console.log('Level changed because of me.')
                    atomicState.switchLevelRequested = false
                } else {
                    console.log('Level changed by someone else.')
                    if (atomicState.override == false) {
                        atomicState.wasItMe = false
                    }
                }
            

	})
