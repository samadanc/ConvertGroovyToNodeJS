
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        context.api.schedules.runIn('create_child_switches', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        context.api.schedules.runIn('create_child_thermostats', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('rescheduleHandler', (context, event) => {
        
                this.traceEvent(settings.logFilter, "${event.name}: ${event.value}", detailedNotif)
                this.rescheduleIfNeeded()
            

	})

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (!evt) {
                    return null
                }
                switch (event.value) {
                    case 'refresh':
                        state?.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                        this.traceEvent(settings.logFilter, "askAlexaMQHandler>new refresh value=${event.jsonData}?.queues", detailedNotif, this.get_LOG_INFO())
                        break
                }
            

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>${event.name}=${event.value}", detailedNotif)
                }
                java.lang.Integer delay = givenInterval ? givenInterval.toInteger() : 5
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - atomicState?.poll['last'] ? atomicState?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago", detailedNotif)
                }
                if (atomicState?.poll['last'] ? atomicState?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>scheduling takeAction in $delay minutes..", detailedNotif)
                    if (delay < 5) {
                        this.runEvery1Minute(takeAction)
                    } else {
                        if (delay >= 5 && delay < 10) {
                            this.runEvery5Minutes(takeAction)
                        } else {
                            if (delay >= 10 && delay < 15) {
                                this.runEvery10Minutes(takeAction)
                            } else {
                                if (delay >= 15 && delay < 30) {
                                    this.runEvery15Minutes(takeAction)
                                } else {
                                    this.runEvery30Minutes(takeAction)
                                }
                            }
                        }
                    }
                    this.takeAction()
                }
                if (!evt) {
                    atomicState.poll['rescheduled'] = this.now()
                }
            

	})

    .scheduledEventHandler('create_child_switches', (context, event) => {
        
                java.lang.Integer countNewChildDevices = 0
                this.traceEvent(settings.logFilter, "create_child_switches>About to loop thru switches $switches", detailedNotif)
                let devices = ecobeeSwitches.collect({ let object ->
                    let dni = object?.key
                    this.traceEvent(settings.logFilter, "create_child_switches>looping thru switches, found dni $dni", detailedNotif)
                    let d = this.getChildDevice(dni)
                    this.traceEvent(settings.logFilter, "create_child_switches>looping thru switches, found device $d", detailedNotif)
                    if (!d) {
                        let switch_info = dni.tokenize('.')
                        let switchId = switch_info.last()
                        let name = switch_info[1]
                        let labelName = 'My switch ' + "$name"
                        this.traceEvent(settings.logFilter, "create_child_switches>about to create child device with dni $dni, switchId = $switchId, name=  $name", detailedNotif)
                        d = this.addChildDevice(this.getChildNamespace(), this.getChildSwitchName(), dni, null, ['label': "$labelName"])
                        d.initialSetup(this.getSmartThingsClientId(), atomicState, switchId)
                        this.traceEvent(settings.logFilter, "create_child_switches>created $labelName with dni $dni", detailedNotif)
                        countNewChildDevices++
                    } else {
                        this.traceEvent(settings.logFilter, "create_child_switches>found ${d.displayName} with dni $dni already exists", detailedNotif)
                        try {
                            if (d.isTokenExpired()) {
                                this.refreshAllChildAuthTokens()
                            }
                        } 
                        catch (let e) {
                            this.traceEvent(settings.logFilter, "create_child_switches>exception $e while trying to refresh existing tokens in child $d", detailedNotif, this.get_LOG_ERROR())
                        } 
                    }
                })
                this.traceEvent(settings.logFilter, "create_child_switches>created $countNewChildDevices, total=${devices.size()} switches", detailedNotif)
            

	})

    .scheduledEventHandler('create_child_thermostats', (context, event) => {
        
                java.lang.Integer countNewChildDevices = 0
                this.traceEvent(settings.logFilter, "create_child_thermostats>About to loop thru thermostats $thermostats", detailedNotif)
                let devices = thermostats.collect({ let dni ->
                    this.traceEvent(settings.logFilter, "create_child_thermostats>looping thru thermostats, found dni $dni", detailedNotif)
                    let d = this.getChildDevice(dni)
                    this.traceEvent(settings.logFilter, "create_child_thermostats>looping thru thermostats, found device $d", detailedNotif)
                    if (!d) {
                        let tstat_info = dni.tokenize('.')
                        let thermostatId = tstat_info.last()
                        let name = tstat_info[1]
                        let labelName = 'My ecobee ' + "$name"
                        this.traceEvent(settings.logFilter, "create_child_thermostats>about to create child device with id $dni, thermostatId = $thermostatId, name=  $name", detailedNotif)
                        d = this.addChildDevice(this.getChildNamespace(), this.getChildName(), dni, null, ['label': "$labelName"])
                        d.initialSetup(this.getSmartThingsClientId(), atomicState, thermostatId)
                        this.traceEvent(settings.logFilter, "create_child_thermostats>created $labelName with dni $dni", detailedNotif)
                        countNewChildDevices++
                    } else {
                        this.traceEvent(settings.logFilter, "create_child_thermostats>found ${d.displayName} with dni $dni already exists", detailedNotif)
                        try {
                            if (d.isTokenExpired()) {
                                this.refreshAllChildAuthTokens()
                            }
                        } 
                        catch (let e) {
                            this.traceEvent(settings.logFilter, "create_child_thermostats>exception $e while trying to refresh existing tokens in child $d", detailedNotif, this.get_LOG_ERROR())
                        } 
                    }
                })
                this.traceEvent(settings.logFilter, "create_child_thermostats>created $countNewChildDevices, total=${devices.size()} thermostats", detailedNotif)
            

	})
