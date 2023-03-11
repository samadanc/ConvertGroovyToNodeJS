
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('gpmHandler', (context, event) => {
        
                let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                let today = new Date()
                today.clearTime()
                Calendar c = Calendar.getInstance()
                c.setTime(today)
                java.lang.Integer dow = c.get(Calendar.DAY_OF_WEEK)
                let dowName = daysOfTheWeek[dow - 1]
                let gpm = new BigDecimal(event.value)
                let rules = state.rules
                state.cumulativeBaseline = meter.latestValue('cumulative')
                rules.each({ let it ->
                    let r = it.rules
                    let childAppID = it.id
                    switch (r.type) {
                        case 'Mode (GPM and mode based)':
                            console.log("Mode (GPM and mode based) Evaluation: ${location.currentMode} in ${r.modes}... ${this.findIn(r.modes, location.currentMode)}")
                            if (this.findIn(r.modes, location.currentMode)) {
                                console.log('Checking to see if a notification needs to be sent...')
                                if (gpm > r.gpm) {
                                    console.log("Threshold:${r.gpm} gpm, Actual:$gpm gpm")
                                    console.log('Need to send a notification!')
                                    this.sendNotification(childAppID, r.gpm, gpm)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        case 'Time Period (GPM and time based)':
                            console.log("Time Period (GPM and time based) Evaluation: $r")
                            let boolTime = this.timeOfDayIsBetween(r.startTime, r.endTime, new Date(), location.timeZone)
                            let boolDay = !r.days || this.findIn(r.days, dowName)
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (boolTime && boolDay && boolMode ) {
                                console.log('Checking to see if a notification needs to be sent...')
                                if (gpm > r.gpm) {
                                    console.log("Threshold:${r.gpm} gpm, Actual:$gpm gpm")
                                    console.log('Need to send a notification!')
                                    this.sendNotification(childAppID, r.gpm, gpm)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        case 'Continuous Flow (GPM over time)':
                            console.log("Continuous Flow (GPM over time) Evaluation: $r")
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (event.value == '0') {
                                console.log('Flow stopped, so clean up and get ready for another evaluation when flow starts again...')
                                state["startTime$childAppID"] = 0
                            } else {
                                if (state["startTime$childAppID"] != null) {
                                    if (state["startTime$childAppID"] == 0) {
                                        console.log('Start monitoring GPM for continuous flow, so set up important variables...')
                                        state["startTime$childAppID"] = this.now()
                                    } else {
                                        console.log("Monitoring GPM for continuous flow (flow value detected: ${event.value})...")
                                    }
                                } else {
                                    console.log('Start monitoring GPM for continuous flow, so set up important variables...')
                                    state["startTime$childAppID"] = this.now()
                                }
                                let timeDelta = this.now() - state["startTime$childAppID"] / 60000
                                console.log('Checking to see if a notification needs to be sent...')
                                if (timeDelta > r.flowMinutes && boolMode ) {
                                    console.log("Threshold:${r.flowMinutes} minutes, Actual:$timeDelta minutes")
                                    console.log('Need to send a notification!')
                                    this.sendNotification(childAppID, r.flowMinutes, timeDelta)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        case 'Water Valve Status (GPM and valve state)':
                            console.log("Water Valve Status (GPM and valve state) Evaluation: $r")
                            let child = this.getChildById(childAppID)
                            if (child.isValveStatus(r.valveStatus)) {
                                console.log('Checking to see if a notification needs to be sent...')
                                if (gpm > r.gpm) {
                                    console.log("Threshold:${r.gpm} gpm, Actual:$gpm gpm")
                                    console.log('Need to send a notification!')
                                    this.sendNotification(childAppID, r.gpm, gpm)
                                }
                            }
                            break
                        default: 
                        break
                    }
                })
            

	})

    .subscribedEventHandler('cumulativeHandler', (context, event) => {
        
                let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                let today = new Date()
                today.clearTime()
                Calendar c = Calendar.getInstance()
                c.setTime(today)
                java.lang.Integer dow = c.get(Calendar.DAY_OF_WEEK)
                let dowName = daysOfTheWeek[dow - 1]
                let cumulative = new BigDecimal(event.value)
                let rules = state.rules
                rules.each({ let it ->
                    let r = it.rules
                    let childAppID = it.id
                    switch (r.type) {
                        case 'Continuous Flow (Gallons and time based)':
                            console.log("Continuous Flow (Gallons and time based) Evaluation: $r")
                            let boolTime = this.timeOfDayIsBetween(r.startTime, r.endTime, new Date(), location.timeZone)
                            let boolDay = !r.days || this.findIn(r.days, dowName)
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (boolTime && boolDay && boolMode ) {
                                console.log('Cumulative value received, and met rule criteria, so let\'s process data points...')
                                let delta = 0
                                if (state["startAccumulate$childAppID"] != null) {
                                    console.log("Using previously saved cumulative data point : ${state[startAccumulate$childAppID]} and newest data point $cumulative...")
                                    delta = cumulative - state["startAccumulate$childAppID"]
                                } else {
                                    console.log("Using baseline cumulative data point : ${state.cumulativeBaseline} and newest data point $cumulative...")
                                    delta = cumulative - state.cumulativeBaseline
                                }
                                console.log("Difference from last cumulative data point is $delta gallons, so checking to see if a notification needs to be sent...")
                                if (delta > r.gallons) {
                                    console.log("Need to send a notification! Threshold:${r.gallons} gallons, Actual:$delta gallons...")
                                    state["startAccumulate$childAppID"] = cumulative 
                                    this.sendNotification(childAppID, r.gallons, delta)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                } else {
                                    console.log("Not sending a notification because the threshold of ${r.gallons} gallons hasn't happened, so reset and wait again...")
                                    state["startAccumulate$childAppID"] = cumulative 
                                }
                            } else {
                                console.log('Outside specified time, saving value...')
                                state["startAccumulate$childAppID"] = cumulative 
                            }
                            break
                        case 'Total Flow (Gallons since last reset)':
                            console.log("Total Flow (Gallons since last reset) Evaluation: $r")
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (boolMode) {
                                console.log('Checking to see if a notification needs to be sent...')
                                if (cumulative > r.gallons) {
                                    console.log("Threshold:${r.gallons} gallons, Actual:$cumulative gallons")
                                    console.log('Need to send a notification!')
                                    this.sendNotification(childAppID, r.gallons, cumulative)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        default: 
                        break
                    }
                })
            

	})
