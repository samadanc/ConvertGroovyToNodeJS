
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'scheduleWatchdog')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'AskAlexaMQ', 'askAlexaMQHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'scheduleWatchdog')

    })

    .subscribedEventHandler('userDefinedEvent', (context, event) => {
        
                if (this.now() - atomicState.lastUserDefinedEvent / 60000.0 < 0.5) {
                    if (this.debugLevel(4)) {
                        this.LOG('userDefinedEvent() - time since last event is less than 30 seconds, ignoring.', 4)
                    }
                    return null
                }
                if (this.debugLevel(4)) {
                    this.LOG("userDefinedEvent() - with evt (Device:${evt?.displayName} ${evt?.name}:${evt?.value})", 4, null, 'info')
                }
                this.poll()
                atomicState.lastUserDefinedEvent = this.now()
                atomicState.lastUserDefinedEventDate = this.getTimestamp()
                atomicState.lastUserDefinedEventInfo = "Event Info: (Device:${evt?.displayName} ${evt?.name}:${evt?.value})"
                let lastUserWatchdog = atomicState.lastUserWatchdogEvent
                if (lastUserWatchdog) {
                    if (this.now() - lastUserWatchdog / 60000 < 3) {
                        if (this.debugLevel(4)) {
                            this.LOG('userDefinedEvent() - polled, but time since last watchdog is less than 3 minutes, exiting without performing additional actions', 4)
                        }
                        return null
                    }
                }
                atomicState.lastUserWatchdogEvent = this.now()
                this.scheduleWatchdog(evt, true)
            

	})

    .subscribedEventHandler('sunsetEvent', (context, event) => {
        
                this.LOG("sunsetEvent() - with evt (${evt?.name}:${evt?.value})", 4, null, 'info')
                atomicState.timeOfDay = 'night'
                atomicState.lastSunsetEvent = this.now()
                atomicState.lastSunsetEventDate = this.getTimestamp()
                let sunriseAndSunset = atomicState.zipCode ? this.getSunriseAndSunset(['zipCode': atomicState.zipCode]) : this.getSunRiseAndSunset()
                if (atomicState.timeZone) {
                    atomicState.sunsetTime = sunriseAndSunset.sunset.format('HHmm', TimeZone.getTimeZone(atomicState.timeZone)).toInteger()
                } else {
                    if (sunriseAndSunset != [:] && location != null) {
                        atomicState.sunsetTime = sunriseAndSunset.sunset.format('HHmm').toInteger()
                    } else {
                        atomicState.sunsetTime = event.value.toInteger()
                    }
                }
                atomicState.getWeather = true
                atomicState.forcePoll = true
                this.scheduleWatchdog(evt, true)
            

	})

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                this.LOG("askAlexaMQHandler ${evt?.name} ${evt?.value}", 4, null, 'trace')
                if (!evt) {
                    return null
                }
                if (event.value == 'refresh') {
                    atomicState.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                    return null
                }
                if (!settings.askAlexa) {
                    return null
                }
                if (!settings.ackOnExpire && !settings.ackOnDelete) {
                    return null
                }
                if (event.value.startsWith('Ecobee Status.')) {
                    let askAlexaAlerts = atomicState.askAlexaAlerts
                    let askAlexaAppAlerts = atomicState.askAlexaAppAlerts
                    if (!askAlexaAlerts && !askAlexaAppAlerts) {
                        return null
                    }
                    let messageID = event.value.drop(14)
                    if (askAlexaAlerts) {
                        askAlexaAlerts.each({ let tid ->
                            if (askAlexaAlerts[ tid ]?.contains(messageID)) {
                                let deleteType = event.jsonData && event.jsonData?.deleteType ? event.jsonData.deleteType : ''
                                if (settings.ackOnExpire && deleteType == 'expire') {
                                    this.acknowledgeEcobeeAlert(tid.toString(), messageID)
                                } else {
                                    if (settings.ackOnDelete && deleteType.startsWith('delete')) {
                                        this.acknowledgeEcobeeAlert(tid.toString(), messageID)
                                    }
                                }
                                askAlexaAlerts[ tid ].removeAll({ 
                                    it == messageID 
                                })
                                if (!(askAlexaAlerts[ tid ])) {
                                    askAlexaAlerts[ tid ] = []
                                }
                                atomicState.askAlexaAlerts = askAlexaAlerts 
                            }
                        })
                    }
                    if (askAlexaAppAlerts) {
                        askAlexaAppAlerts.each({ let tid ->
                            if (askAlexaAppAlerts[ tid ]?.contains(messageID)) {
                                askAlexaAppAlerts[ tid ].removeAll({ 
                                    it == messageID 
                                })
                                if (!(askAlexaAppAlerts[ tid ])) {
                                    askAlexaAppAlerts[ tid ] = []
                                }
                                atomicState.askAlexaAppAlerts = askAlexaAppAlerts 
                            }
                        })
                    }
                }
            

	})

    .subscribedEventHandler('sunriseEvent', (context, event) => {
        
                this.LOG("sunriseEvent() - with evt (${evt?.name}:${evt?.value})", 4, null, 'info')
                atomicState.timeOfDay = 'day'
                atomicState.lastSunriseEvent = this.now()
                atomicState.lastSunriseEventDate = this.getTimestamp()
                let sunriseAndSunset = atomicState.zipCode ? this.getSunriseAndSunset(['zipCode': atomicState.zipCode]) : this.getSunRiseAndSunset()
                if (atomicState.timeZone) {
                    atomicState.sunriseTime = sunriseAndSunset.sunrise.format('HHmm', TimeZone.getTimeZone(atomicState.timeZone)).toInteger()
                } else {
                    if (sunriseAndSunset != [:] && location != null) {
                        atomicState.sunriseTime = sunriseAndSunset.sunrise.format('HHmm').toInteger()
                    } else {
                        atomicState.sunriseTime = event.value.toInteger()
                    }
                }
                atomicState.getWeather = true
                atomicState.forcePoll = true
                this.scheduleWatchdog(evt, true)
            

	})

    .subscribedEventHandler('scheduleWatchdog', (context, event) => {
        
                let results = true
                if (this.debugLevel(4)) {
                    let evtStr = evt ? "${event.name}:${event.value}" : 'null'
                    if (this.debugLevel(4)) {
                        this.LOG("scheduleWatchdog() called with evt ($evtStr) & local ($local)", 4, null, 'trace')
                    }
                }
                if (evt == null && local == false) {
                    atomicState.lastScheduledWatchdog = this.now()
                    atomicState.lastScheduledWatchdogDate = this.getTimestamp()
                    atomicState.getWeather = true
                    let counter = atomicState.hourlyForcedUpdate
                    counter = !counter ? 1 : counter + 1
                    if (counter == 4) {
                        counter = 0
                        atomicState.forcePoll = true
                    }
                    atomicState.hourlyForcedUpdate = counter 
                }
                let timeSinceLastWatchdog = this.now() - atomicState.lastWatchdog / 60000
                if (timeSinceLastWatchdog < 1) {
                    if (this.debugLevel(4)) {
                        this.LOG("It has only been $timeSinceLastWatchdog since last scheduleWatchdog was called. Please come back later.", 4, null, 'trace')
                    }
                    return true
                }
                atomicState.lastWatchdog = this.now()
                atomicState.lastWatchdogDate = this.getTimestamp()
                let pollAlive = this.isDaemonAlive('poll')
                let watchdogAlive = this.isDaemonAlive('watchdog')
                if (this.debugLevel(4)) {
                    this.LOG('After watchdog tagging', 4, null, 'trace')
                }
                if (this.apiConnected() == 'lost') {
                    if (this.refreshAuthToken()) {
                        this.LOG('scheduleWatchdog() - Was able to recover the lost connection. Please ignore any notifications received.', 1, null, 'warn')
                    } else {
                        this.LOG('scheduleWatchdog() - Unable to schedule handlers do to loss of API Connection. Please ensure you are authorized.', 1, null, 'error')
                        return false
                    }
                }
                this.LOG("scheduleWatchdog() --> pollAlive==$pollAlive  watchdogAlive==$watchdogAlive", 4, null, 'debug')
                if (!pollAlive) {
                    this.spawnDaemon('poll')
                }
                if (!watchdogAlive) {
                    this.spawnDaemon('watchdog')
                }
                return true
            

	})
