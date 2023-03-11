
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the light sensor and switches you\'d like to control.', section => {
            section.deviceSetting('sensor').capability(['illuminanceMeasurement']).name('Which light sensor to monitor?');
            section.deviceSetting('exterior_switches').capability(['switch']).name('Which exterior switch(es) to control?');
            section.enumSetting('exterior_target').name('Which lumen value to target for exterior switches?');
            section.deviceSetting('interior_switches').capability(['switch']).name('Which interior switch(es) to control? (optional)');
            section.enumSetting('interior_target').name('Which lumen value to target for interior switches?');
            section.timeSetting('interior_time_off').name('Choose a time to turn the interior lights off at night');
            section.timeSetting('interior_time_on').name('Choose a time to turn the interior lights on in the morning');
            section.deviceSetting('interior_exceptions').capability(['switch']).name('Choose any interior switch(es) that are exceptions (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceChangeHandler')

        context.api.schedules.schedule('interiorLightsOnHandler', delay);

        context.api.schedules.schedule('interiorLightsOffHandler', delay);

    })

    .subscribedEventHandler('switchChangeHandler', (context, event) => {
        
        state.switch_value = event.value
        

	})

    .subscribedEventHandler('illuminanceChangeHandler', (context, event) => {
        
        let lux_measurement = event.integerValue
        this.evalIlluminanceAction(lux_measurement, 'exterior')
        if (interior_switches != null) {
        this.evalIlluminanceAction(lux_measurement, 'interior')
        }
        

	})

    .scheduledEventHandler('interiorLightsOffHandler', (context, event) => {
        
        if (location.mode == 'Keep Lights On') {
        this.sendNotificationEvent('[LIGHTING] Keeping lights ON due to the Keep Lights On mode being set.')
        } else {
        log.trace("Time $interior_time_off has been reached. Turning the interior switches OFF.")
        if (interior_switches != null) {
        interior_switches.each({ let object ->
        let interior_exception = false
        if (interior_exceptions != null) {
        interior_exceptions.each({ let exception ->
        if (exception.getLabel() == object.getLabel()) {
        interior_exception = true
        return null
        }
        })
        }
        if (!interior_exception) {
        object.off()
        }
        })
        }
        }
        

	})

    .scheduledEventHandler('interiorLightsOnHandler', (context, event) => {
        
        let week_day_date = new java.text.SimpleDateFormat('u')
        week_day_date.setTimeZone(location.timeZone)
        let week_day = week_day_date.format(new Date())
        if (week_day.toInteger() < 6) {
        
        context.api.devices.sendCommands(context.config.sensor, 'illuminanceMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.interior_target, 'enum', toInteger)
    
        if (lux_measurement < lux_target ) {
        if (location.mode == 'Keep Lights Off') {
        this.sendNotificationEvent('[LIGHTING] Keeping lights OFF due to the Keep Lights Off mode being set.')
        } else {
        log.trace("Time $interior_time_on has been reached. Turning the interior switches ON.")
        if (interior_switches != null) {
        interior_switches.each({ let object ->
        let interior_exception = false
        if (interior_exceptions != null) {
        interior_exceptions.each({ let exception ->
        if (exception.getLabel() == object.getLabel()) {
        interior_exception = true
        return null
        }
        })
        }
        if (!interior_exception) {
        object.on()
        }
        })
        }
        }
        }
        }
        

	})
