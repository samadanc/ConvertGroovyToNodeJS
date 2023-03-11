
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        context.api.schedules.schedule('monitorAdjustTemp', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('programCoolEvtHandler', (context, event) => {
        
                console.log("programCoolEvtHandler>${event.name} = ${event.value}")
            

	})

    .subscribedEventHandler('changeModeHandler', (context, event) => {
        
                console.log("changeModeHandler>${event.name}: ${event.value}")
                ecobee.resumeThisTstat()
                this.rescheduleIfNeeded(evt)
                this.monitorAdjustTemp()
            

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    console.log("rescheduleIfNeeded>${event.name}=${event.value}")
                }
                Integer delay = givenInterval ? givenInterval : 10
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
                }
                if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
                    log.info("rescheduleIfNeeded>scheduling monitorAdjustTemp in $delay minutes..")
                    this.schedule("0 0/$delay * * * ?", monitorAdjustTemp)
                }
                this.monitorAdjustTemp()
                if (!evt) {
                    state.poll['rescheduled'] = this.now()
                }
            

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                this.monitorAdjustTemp()
            

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
            

	})

    .subscribedEventHandler('setClimateEvtHandler', (context, event) => {
        
                console.log("SetClimateEvtHandler>${event.name}: ${event.value}")
            

	})

    .subscribedEventHandler('programHeatEvtHandler', (context, event) => {
        
                console.log("programHeatEvtHandler>${event.name} = ${event.value}")
            

	})

    .subscribedEventHandler('motionEvtHandler', (context, event) => {
        
                if (event.value == 'active') {
                    console.log('Motion at home...')
                    String currentProgName = ecobee.currentClimateName
                    String currentProgType = ecobee.currentProgramType
                    if (state?.programHoldSet == 'Away') {
                        this.check_if_hold_justified()
                    } else {
                        if (currentProgName.toUpperCase() == 'AWAY' && state?.programHoldSet == '' && currentProgType.toUpperCase() != 'VACATION') {
                            this.check_if_hold_needed()
                        }
                    }
                }
            

	})

    .scheduledEventHandler('monitorAdjustTemp', (context, event) => {
        
                Integer delay = givenInterval ? givenInterval : 10
                let todayDay = new Date().format('dd', location.timeZone)
                if (!state?.today || todayDay != state?.today) {
                    state?.exceptionCount = 0
                    state?.sendExceptionCount = 0
                    state?.today = todayDay 
                }
                state?.poll['last'] = this.now()
                if (state?.poll['rescheduled'] ? state?.poll['rescheduled'] : 0 + delay * 60000 < this.now()) {
                    log.info("scheduling rescheduleIfNeeded() in $delay minutes..")
                    this.schedule("0 0/$delay * * * ?", rescheduleIfNeeded)
                    state?.poll['rescheduled'] = this.now()
                }
                if (powerSwitch?.currentSwitch == 'off') {
                    if (detailedNotif) {
                        this.send("Virtual master switch ${powerSwitch.name} is off, processing on hold...")
                    }
                    return null
                }
                if (detailedNotif) {
                    this.send("monitoring every $delay minute(s)")
                }
                let MAX_EXCEPTION_COUNT = 5
                String exceptionCheck 
                String msg 
                try {
                    ecobee.poll()
                    exceptionCheck = ecobee.currentVerboseTrace.toString()
                    if (exceptionCheck && exceptionCheck.contains('exception') || exceptionCheck.contains('error') && !(exceptionCheck.contains('Java.util.concurrent.TimeoutException'))) {
                        state?.exceptionCount = state.exceptionCount + 1
                        log.error("found exception/error after polling, exceptionCount= ${state?.exceptionCount}: $exceptionCheck")
                    } else {
                        state?.exceptionCount = 0
                    }
                } 
                catch (let e) {
                    log.error("exception $e while trying to poll the device $d, exceptionCount= ${state?.exceptionCount}")
                } 
                if (state?.exceptionCount >= MAX_EXCEPTION_COUNT || exceptionCheck && exceptionCheck.contains('Unauthorized')) {
                    msg = "too many exceptions/errors or unauthorized exception, $exceptionCheck (${state?.exceptionCount} errors), may need to re-authenticate at ecobee..."
                    this.send("$msg")
                    log.error(msg)
                    return null
                }
                String currentProgType = ecobee.currentProgramType
                log.trace("program Type= $currentProgType")
                if (currentProgType.toUpperCase().contains('HOLD')) {
                    log.trace('about to call check_if_hold_justified....')
                    this.check_if_hold_justified()
                }
                if (!(currentProgType.contains('vacation'))) {
                    log.trace('about to call check_if_needs_hold....')
                    this.check_if_hold_needed()
                }
            

	})
