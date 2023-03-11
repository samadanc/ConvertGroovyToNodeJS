
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Things to Monitor:', section => {
            section.deviceSetting('thermostats').capability(['temperatureMeasurement']).name('Things With Thermostat Sensor');

        });


        page.section('Set Temperature Alerts:', section => {
            section.numberSetting('maxThreshold').name('if above... (default 90°)');
            section.numberSetting('minThreshold').name('if below... (default 60°)');

        });


        page.section('Via text message at this number (or via push notification if not specified', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('checkTemprature', delay);

    })

    .scheduledEventHandler('checkTemprature', (context, event) => {
        
        log.trace('checkTemprature()')
        for (let thermostat : thermostats ) {
        let temperature = thermostat.currentValue('temperature')
        if (temperature == null || temperature == '') {
        log.error("Skipping ${thermostat.label} as reading currentValue failed")
        continue
        }
        log.trace("Checking ${thermostat.label}: $temperature°")
        if
        
        context.api.devices.sendCommands(context.config.maxThreshold, 'number', notify)
    
        } else {
        if
        
        context.api.devices.sendCommands(context.config.minThreshold, 'number', notify)
    
        } else {
        console.log("${thermostat.label} [$temperature°] is in the acceptable range")
        }
        }
        }
        

	})
