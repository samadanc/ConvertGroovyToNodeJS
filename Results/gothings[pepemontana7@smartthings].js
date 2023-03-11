
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'scheduleWatchdog')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'scheduleWatchdog')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetEvent')

    })

    .subscribedEventHandler('scheduleWatchdog', (context, event) => {
        
                let results = true
                this.LOG("scheduleWhatchdog() called with: evt (${evt?.name}:${evt?.value}) & local ($local)", 4, null, 'trace')
                if (evt == null && local == false) {
                    atomicState.lastScheduledWatchdog = this.now()
                    atomicState.lastScheduledWatchdogDate = this.getTimestamp()
                }
                let timeSinceLastWatchdog = this.now() - state.lastWatchdog / 1000 / 60
                if (timeSinceLastWatchdog < 1) {
                    this.LOG("It has only been $timeSinceLastWatchdog since last scheduleWatchdog was called. Please come back later.", 2, null, 'trace')
                    return true
                }
                atomicState.lastWatchdog = this.now()
                atomicState.lastWatchdogDate = this.getTimestamp()
                this.LOG('After watchdog tagging')
                if (this.apiConnected() == 'lost') {
                    this.LOG('scheduleWatchdog() apiConnected() == refreshotoken next...')
                    if (this.refreshAuthToken()) {
                        this.LOG('scheduleWatchdog() - Was able to recover the lost connection. Please ignore any notifications received.', 1, null, 'error')
                    } else {
                        this.LOG('scheduleWatchdog() - Unable to schedule handlers do to loss of API Connection. Please ensure you are authorized.', 1, null, 'error')
                        return false
                    }
                }
                let pollAlive = this.isDaemonAlive('poll')
                let watchdogAlive = this.isDaemonAlive('watchdog')
                this.LOG("scheduleWatchdog() --> pollAlive==$pollAlive  watchdogAlive==$watchdogAlive", 4, null, 'debug')
                if (!pollAlive) {
                    this.spawnDaemon('poll')
                }
                if (!watchdogAlive) {
                    this.spawnDaemon('watchdog')
                }
                return true
            

	})

    .subscribedEventHandler('sunriseEvent', (context, event) => {
        
                this.LOG("sunriseEvent() - with evt (${evt?.name}:${evt?.value})", 4, null, 'info')
                atomicState.timeOfDay = 'day'
                atomicState.lastSunriseEvent = this.now()
                atomicState.lastSunriseEventDate = this.getTimestamp()
                if (location.timeZone) {
                    atomicState.sunriseTime = new Date().format('HHmm', location.timeZone).toInteger()
                } else {
                    atomicState.sunriseTime = new Date().format('HHmm').toInteger()
                }
                this.scheduleWatchdog(evt, true)
            

	})

    .subscribedEventHandler('userDefinedEvent', (context, event) => {
        
                this.LOG("userDefinedEvent() - with evt (Device:${evt?.displayName} ${evt?.name}:${evt?.value})", 4, null, 'info')
                atomicState.lastUserDefinedEventDate = this.getTimestamp()
                atomicState.lastUserDefinedEventInfo = "Event Info: (Device:${evt?.displayName} ${evt?.name}:${evt?.value})"
                if (this.now() - atomicState.lastUserDefinedEvent / 1000 / 60 < 3) {
                    this.LOG('Time since last event is less than 3 minutes. Exiting without performing additional actions.', 4)
                    return null
                }
                atomicState.lastUserDefinedEvent = this.now()
                atomicState.lastUserDefinedEventDate = this.getTimestamp()
                this.poll()
                this.scheduleWatchdog(evt, true)
            

	})

    .subscribedEventHandler('sunsetEvent', (context, event) => {
        
                this.LOG("sunsetEvent() - with evt (${evt?.name}:${evt?.value})", 4, null, 'info')
                atomicState.timeOfDay = 'night'
                atomicState.lastSunsetEvent = this.now()
                atomicState.lastSunsetEventDate = this.getTimestamp()
                if (location.timeZone) {
                    atomicState.sunsetTime = new Date().format('HHmm', location.timeZone).toInteger()
                } else {
                    atomicState.sunsetTime = new Date().format('HHmm').toInteger()
                }
                this.scheduleWatchdog(evt, true)
            

	})
