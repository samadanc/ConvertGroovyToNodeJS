
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
                let gpm = event.value
                let cumulative = meter.latestValue('cumulative')
                console.log("GPM Handler: [gpm: $gpm, cumulative: $cumulative]")
                let rules = state.rules
                rules.each({ let it ->
                    let r = it.rules
                    let childAppID = it.id
                    switch (r.type) {
                        case 'Continuous Flow':
                            console.log("Continuous Flow Test (GPM): $r")
                            let contMinutes = 0
                            if (gpm == '0.0') {
                                state["contHistory$childAppID"] = []
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
                let gpm = meter.latestValue('gpm')
                let cumulative = new BigDecimal(event.value)
                console.log("Cumulative Handler: [gpm: $gpm, cumulative: $cumulative]")
                let rules = state.rules
                rules.each({ let it ->
                    let r = it.rules
                    let childAppID = it.id
                    switch (r.type) {
                        case 'Mode':
                            console.log("Mode Test: ${location.currentMode} in ${r.modes}... ${this.findIn(r.modes, location.currentMode)}")
                            if (this.findIn(r.modes, location.currentMode)) {
                                console.log("Threshold:${r.gpm}, Value:$gpm")
                                if (gpm > r.gpm) {
                                    this.sendNotification(childAppID, gpm)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        case 'Time Period':
                            console.log("Time Period Test: $r")
                            let boolTime = this.timeOfDayIsBetween(r.startTime, r.endTime, new Date(), location.timeZone)
                            let boolDay = !r.days || this.findIn(r.days, dowName)
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (boolTime && boolDay && boolMode ) {
                                if (gpm > r.gpm) {
                                    this.sendNotification(childAppID, gpm)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            }
                            break
                        case 'Accumulated Flow':
                            console.log("Accumulated Flow Test: $r")
                            let boolTime = this.timeOfDayIsBetween(r.startTime, r.endTime, new Date(), location.timeZone)
                            let boolDay = !r.days || this.findIn(r.days, dowName)
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (boolTime && boolDay && boolMode ) {
                                let delta = 0
                                if (state["accHistory$childAppID"] != null) {
                                    delta = cumulative - state["accHistory$childAppID"]
                                } else {
                                    state["accHistory$childAppID"] = cumulative 
                                }
                                console.log("Currently in specified time, delta from beginning of time period: $delta")
                                if (delta > r.gallons) {
                                    this.sendNotification(childAppID, delta)
                                    if (r.dev) {
                                        let activityApp = this.getChildById(childAppID)
                                        activityApp.devAction(r.command)
                                    }
                                }
                            } else {
                                console.log('Outside specified time, saving value')
                                state["accHistory$childAppID"] = cumulative 
                            }
                            break
                        case 'Continuous Flow':
                            console.log("Continuous Flow Test: $r")
                            let contMinutes = 0
                            let boolMode = !r.modes || this.findIn(r.modes, location.currentMode)
                            if (gpm != 0) {
                                if (state["contHistory$childAppID"] == []) {
                                    state["contHistory$childAppID"] = new Date()
                                } else {
                                    let historyDate = new Date().parse('yyyy-MM-dd\'T\'HH:mm:ssZ', state["contHistory$childAppID"])
                                    let td = this.now() - historyDate.getTime()
                                    contMinutes = td / 60000
                                    console.log("Minutes of constant flow: $contMinutes, since ${state[contHistory$childAppID]}")
                                }
                            }
                            if (contMinutes > r.flowMinutes && boolMode ) {
                                this.sendNotification(childAppID, Math.round(contMinutes))
                                if (r.dev) {
                                    let activityApp = this.getChildById(childAppID)
                                    activityApp.devAction(r.command)
                                }
                            }
                            break
                        case 'Water Valve Status':
                            console.log("Water Valve Test: $r")
                            let child = this.getChildById(childAppID)
                            if (child.isValveStatus(r.valveStatus)) {
                                if (gpm > r.gpm) {
                                    this.sendNotification(childAppID, gpm)
                                }
                            }
                            break
                        case 'Switch Status':
                            break
                        default: 
                        break
                    }
                })
            

	})
