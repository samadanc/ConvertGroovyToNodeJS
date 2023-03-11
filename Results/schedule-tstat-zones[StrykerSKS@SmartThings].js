
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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    console.log("rescheduleIfNeeded>${event.name}=${event.value}")
                }
                Integer delay = 5
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
                }
                if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
                    log.info("recheduleIfNeeded>scheduling setZoneSettings in $delay minutes..")
                    this.runEvery5Minutes(setZoneSettings)
                }
                this.setZoneSettings()
                if (!evt) {
                    state.poll['rescheduled'] = this.now()
                }
            

	})

    .subscribedEventHandler('ventTemperatureHandler', (context, event) => {
        
                console.log("vent temperature: ${event.value}")
                java.lang.Float ventTemp = event.value.toFloat()
                let scale = this.getTemperatureScale()
                let MAX_TEMP_VENT_SWITCH = scale == 'C' ? 49 : 121
                let MIN_TEMP_VENT_SWITCH = scale == 'C' ? 7 : 45
                String currentHVACMode = thermostat.currentThermostatMode.toString()
                if (currentHVACMode == 'heat' || currentHVACMode == 'auto' && ventTemp >= MAX_TEMP_VENT_SWITCH ) {
                    this.open_all_vents()
                    this.send("ScheduleTstatZones>current HVAC mode is $currentHVACMode, found one of the vents' value too hot (${event.value}°), opening all vents to avoid any damage")
                }
                if (currentHVACMode == 'cool' || currentHVACMode == 'auto' && ventTemp <= MIN_TEMP_VENT_SWITCH ) {
                    this.open_all_vents()
                    this.send("ScheduleTstatZones>current HVAC mode is $currentHVACMode, found one of the vents' value too cold (${event.value}°), opening all vents to avoid any damage")
                }
            

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                this.setZoneSettings()
            

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
            

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
                console.log("cooling Setpoint now: ${event.value}")
            

	})

    .subscribedEventHandler('thermostatOperatingHandler', (context, event) => {
        
                console.log("Thermostat Operating now: ${event.value}")
                state?.operatingState = event.value
                this.setZoneSettings()
            

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
                console.log("heating Setpoint now: ${event.value}")
            

	})

    .subscribedEventHandler('motionEvtHandler', (context, event) => {
        
                if (event.value == 'active') {
                    console.log('Motion at home...')
                    if (state?.setPresentOrAway == 'Away') {
                        this.set_main_tstat_to_AwayOrPresent('present')
                    }
                }
            

	})
