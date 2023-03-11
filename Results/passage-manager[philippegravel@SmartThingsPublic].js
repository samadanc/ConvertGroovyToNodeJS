
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                console.log("Passage Manager: ${event.name}: ${event.value} (Last Status: ${state.lastStatus})")
                if (event.value == 'on') {
                    if (atomicState.lastStatus == 'off') {
                        console.log("Passage Manager: Change percent to $percentLightDefault")
                        light.setLevel(percentLightDefault)
                    }
                } else {
                    if (event.value == 'off') {
                        atomicState.lastStatus = 'off'
                    }
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                atomicState.inProcess = true
                if (event.value == 'active') {
                    console.log("Passage Manager: Current mode: ${location.mode}, Current Switch: ${light.currentSwitch}")
                    if (light.currentSwitch == 'off') {
                        if (location.mode == 'Evening') {
                            console.log("Passage Manager: turning on lights due to motion (at $percentLightHigh%)")
                            atomicState.lastStatus = 'on'
                            light.setLevel(percentLightHigh)
                            atomicState.motionStopTime = null
                        } else {
                            if (location.mode == 'Night') {
                                let now = new Date()
                                let sunTime = this.getSunriseAndSunset()
                                if (now > sunTime.sunset || now < stopOpenAtTime ) {
                                    atomicState.lastStatus = 'on'
                                    light.setLevel(percentLightLow)
                                    atomicState.motionStopTime = null
                                }
                            }
                        }
                    }
                } else {
                    if (atomicState.lastStatus == 'on') {
                        console.log("Passage Manager ${event.name}: ${event.value}, ${event.displayName}")
                        atomicState.motionStopTime = this.now()
                        if (delaySeconds) {
                            let fireTime = new Date(new Date().time + delaySeconds * 1000)
                            this.runOnce(fireTime, turnOffMotionAfterDelay, ['overwrite': true])
                        } else {
                            this.turnOffMotionAfterDelay()
                        }
                    }
                }
                atomicState.inProcess = false
            

	})
