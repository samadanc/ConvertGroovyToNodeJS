
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('turnOffLights', delay);

        context.api.schedules.schedule('turnOnLightsLevel', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        context.api.schedules.schedule('turnOnLights', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                this.scheduleTurnOn(event.value, sunriseOffset)
            

	})

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                this.scheduleTurnOn(event.value, sunsetOffset)
            

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                if (this.checkMode()) {
                    this.executeAction()
                }
            

	})

    .subscribedEventHandler('switchHandler', (context, event) => {
        
                if (event.value == 'off' && switchState == 'turned off' || event.value == 'on' && switchState == 'turned on') {
                    this.executeAutomation()
                } else {
                    if (event.value == 'off' && switchState == 'turned on' && oppositeAction || event.value == 'open' && switchState == 'turned off' && oppositeAction ) {
                        this.executeOpposite()
                    }
                }
            

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
                if (lightSensorState == 'equal or lower' && event.integerValue <= lightLevel || lightSensorState == 'equal or greater' && event.integerValue >= lightLevel || lightSensorState == 'between' && event.integerValue < lightUpperLimit && event.integerValue > lightLowerLimit ) {
                    this.executeAutomation()
                }
            

	})

    .subscribedEventHandler('accelerationHandler', (context, event) => {
        
                if (event.value == 'active' && accelerationSensorState == 'acceleration starts' || event.value == 'inactive' && contactSensorState == 'acceleration stops') {
                    this.executeAutomation()
                } else {
                    if (event.value == 'active' && contactSensorState == 'acceleration stops' && oppositeAction || event.value == 'inactive' && contactSensorState == 'acceleration starts' && oppositeAction ) {
                        this.executeOpposite()
                    }
                }
            

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
                if (event.value == 'present' && presenceSensorState == 'someone arrives') {
                    this.executeAutomation()
                } else {
                    if (presenceSensorState == 'everyone leaves') {
                        let everyoneGone = true
                        presenceSensorList.each({ 
                            if (it.currentPresence == 'present') {
                                everyoneGone = false
                            }
                        })
                        if (everyoneGone) {
                            this.executeAutomation()
                        }
                    }
                }
            

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                if (event.value == 'closed' && contactSensorState == 'closed' || event.value == 'open' && contactSensorState == 'opened') {
                    this.executeAutomation()
                } else {
                    if (event.value == 'closed' && contactSensorState == 'opened' && oppositeAction || event.value == 'open' && contactSensorState == 'closed' && oppositeAction ) {
                        this.executeOpposite()
                    }
                }
            

	})

    .subscribedEventHandler('lockHandler', (context, event) => {
        
                if (event.value == lockState ) {
                    this.executeAutomation()
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (event.value == 'active' && motionSensorState == 'motion starts') {
                    if (state.scheduledToChange) {
                        this.unschedule()
                        state.scheduledToChange = false
                    }
                    this.executeAutomation()
                } else {
                    if (event.value == 'inactive' && motionSensorState == 'motion stops') {
                        if (this.isUnhindered() && !(this.isOverridden())) {
                            state.scheduledToChange = true
                            console.log("Scheduling lights to perform action in $motionStopMinutes minute" + motionStopMinutes == 1 ? '' : 's')
                            this.runIn(motionStopMinutes * 60, executeAutomation)
                        }
                    } else {
                        if (event.value == 'inactive' && motionSensorState == 'motion starts' && oppositeAction ) {
                            if (this.isUnhindered() && !(this.isOverridden())) {
                                state.scheduledToChange = true
                                console.log("Scheduling lights to perform action in $motionStopMinutes minute" + motionStopMinutes == 1 ? '' : 's')
                                this.runIn(motionStopMinutes * 60, executeOpposite)
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('turnOnLightsLevel', (context, event) => {
        
                if (lights.currentSwitch != 'on') {
                    let level = 0
                    if (calculate) {
                        level = this.getCalculatedLevel()
                    } else {
                        level = dimmerLevel 
                    }
                    if (level > 0) {
                        lights.each({ 
                            if (it.hasCommand('setLevel')) {
                                it.setLevel(level)
                            } else {
                                it.on()
                            }
                        })
                    }
                    console.log("${app.label} turning on lights to level $level")
                    state.scheduledToChange = false
                }
            

	})

    .scheduledEventHandler('turnOffLights', (context, event) => {
        
                if (lights.currentSwitch != 'off') {
                    console.log("${app.label} turning lights off")
                    lights.off()
                    state.scheduledToChange = false
                }
            

	})

    .scheduledEventHandler('turnOnLights', (context, event) => {
        
                if (lights.currentSwitch != 'on') {
                    console.log("${app.label} turning on lights")
                    lights.on()
                    state.scheduledToChange = false
                }
            

	})
