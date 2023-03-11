
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

    })

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
                log.trace('locationChange()')
                this.astroCheck()
            

	})

    .subscribedEventHandler('sensorOpenHandler', (context, event) => {
        
                if (this.isDark()) {
                    state.reason = "${event.displayName} ${event.name} is ${event.value}"
                    unschedule 
                    this.trunLightsOn()
                }
            

	})

    .subscribedEventHandler('illuminanceHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}, lastStatus: ${state.lastStatus}, motionStopTime: ${state.motionStopTime}")
                if (state.lastStatus != 'off') {
                    lights.off()
                    state.lastStatus = 'off'
                } else {
                    if (state.motionStopTime) {
                        if (lastStatus != 'off') {
                            let elapsed = this.now() - state.motionStopTime
                            if (elapsed >= delayMinutes ? delayMinutes : 0 * 60000) {
                                turnLightsOff 
                            }
                        }
                    } else {
                        if (lastStatus != 'on' && event.value < 30) {
                            lights.on()
                            state.lastStatus = 'on'
                        }
                    }
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                state.motionActive = false
                for (let sensor : motionSensors ) {
                    if (sensor.currentValue('motion') == 'active') {
                        state.motionActive = true
                    }
                }
                if (state.motionActive) {
                    this.sensorOpenHandler(evt)
                } else {
                    this.sensorCloseHandler(evt)
                }
            

	})

    .subscribedEventHandler('sensorCloseHandler', (context, event) => {
        
                state.reason = "${event.displayName} ${event.name} is ${event.value}"
                log.info("sensorCloseHandler: scheduling trunLightsOff since ${state.reason}")
                this.runIn(delayMinutes * 60, trunLightsOff)
            

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
                let s = this.getSunriseAndSunset(['sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
                state.riseTime = s.sunrise.time
                state.setTime = s.sunset.time
                console.log("rise: ${new Date(state.riseTime)}(${state.riseTime}), set: ${new Date(state.setTime)}(${state.setTime})")
                if (pref == 'Security') {
                    unschedule 
                    state.reason = 'astroCheck'
                    this.schedule(state.riseTime, trunLightsOff)
                    this.schedule(state.setTime, trunLightsOn)
                } else {
                    this.schedule(state.setTime, motionHandler)
                }
            

	})
