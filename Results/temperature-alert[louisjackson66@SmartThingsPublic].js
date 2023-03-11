
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Monitor:', section => {
            section.deviceSetting('theThermostat').capability(['temperatureMeasurement']).name('Things With Thermostats');

        });


        page.section('Set Temperature Alerts:', section => {
            section.numberSetting('maxThreshold').name('if above... (default 90°)');
            section.numberSetting('minThreshold').name('if below... (default 40°)');

        });


        page.section('Via push notification and/or a SMS message', section => {

        });


        page.section(''Version 1.0.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('doTempCheck', delay);

    })

    .scheduledEventHandler('doTempCheck', (context, event) => {
        
        log.trace("(0D) - doTempCheck() - settings: $settings")
        let nDevAbove = 0
        let nDevBelow = 0
        let strAboveMessage = ''
        let strBelowMessage = ''
        for (let thermostatDevice : theThermostat ) {
        let thermostatLevel = thermostatDevice.currentValue('temperature')
        log.trace("(0E) - Checking... ${thermostatDevice.label}: $thermostatLevel°
        ")
        if
        log.warn("(0F) - ${thermostatDevice.label}: $thermostatLevel°
        ")
        strAboveMessage += "- ${thermostatDevice.label}: $thermostatLevel°.
        "
        nDevAbove++
        }
        if
        log.warn("(10) - ${thermostatDevice.label}: $thermostatLevel°
        ")
        strBelowMessage += "- ${thermostatDevice.label}: $thermostatLevel°.
        "
        nDevBelow++
        }
        }
        if (nDevAbove) {
        
        context.api.devices.sendCommands(context.config.maxThreshold, 'number', send)
    
        
        $strAboveMessage")
        }
        if (nDevBelow) {
        
        context.api.devices.sendCommands(context.config.minThreshold, 'number', send)
    
        
        $strBelowMessage")
        }
        

	})
