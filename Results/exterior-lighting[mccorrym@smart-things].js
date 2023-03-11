
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
            section.timeSetting('interior_time').name('Choose a time to turn the interior lights off');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceChangeHandler')

        context.api.schedules.schedule('interiorLightsHandler', delay);

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

    .scheduledEventHandler('interiorLightsHandler', (context, event) => {
        
        log.trace("Time $interior_time has been reached. Turning the interior switches OFF.")
        if (interior_switches != null) {
        interior_switches.each({ let object ->
        console.log(object.currentSwitch)
        object.off()
        })
        }
        

	})
