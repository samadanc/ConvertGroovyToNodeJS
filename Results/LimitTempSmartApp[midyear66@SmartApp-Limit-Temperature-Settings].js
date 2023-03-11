
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Thermostat', section => {
            section.deviceSetting('device').capability(['thermostat']).name('Select thermostat to be monitored');
            section.numberSetting('nor_cool').name('Set normal cooling value');
            section.numberSetting('min_cool').name('Set minimum cooling value');
            section.numberSetting('nor_heat').name('Set normal heating value');
            section.numberSetting('max_heat').name('Set maximum heating value');
            section.numberSetting('length').name('How long to allow HVAC to reach Max Temp (in minutes)');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('heatingEventHandler', (context, event) => {
        
        this.DEBUG("heatingEventHandler: ${event.value}: $evt, $settings")
        let minutes = settings.length.toInteger
        let seconds = minutes * 60
        if
        this.runIn(seconds, lowerHeat)
        }
        

	})

    .subscribedEventHandler('coolingEventHandler', (context, event) => {
        
        this.DEBUG("coolingEventHandler: ${event.value}: $evt, $settings")
        let minutes = settings.length.toInteger
        let seconds = minutes * 60
        if (event.value.toInteger() <= max_cool.toInteger()) {
        this.runIn(seconds, raiseAC)
        }
        

	})
