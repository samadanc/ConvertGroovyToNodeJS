
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Choose temperature sensor(s)', section => {
            section.deviceSetting('tempsensors').capability(['temperatureMeasurement']).name('');

        });


        page.section('Specify maximum temperature (default 80)', section => {
            section.numberSetting('maxtemp').name('Maximum temperature?');

        });


        page.section('Specify minimum temperature (default 55)', section => {
            section.numberSetting('mintemp').name('Minimum temperature?');

        });


        page.section('Specify maximum difference between temperature and setpoint (default 5)', section => {
            section.numberSetting('tempdelta').name('Maximum delta?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('temperatureCheck', delay);

    })

    .scheduledEventHandler('temperatureCheck', (context, event) => {
        
        let tempInfo = tempsensors.currentTemperature
        let setpoint = thermostat.currentThermostatSetpoint
        let fanMode = 'auto'
        console.log("Setpoint $setpoint")
        tempInfo.each({ let temp ->
        console.log("Temp $temp")
        if (temp > maxtemp || temp < mintemp || ((int) temp) - ((int) setpoint).abs() > tempdelta ) {
        log.info("Sensor temp of $temp (setpoint $setpoint). Turning fan on.")
        fanMode = 'on'
        }
        })
        console.log("Fan mode $fanMode")
        if (thermostat.currentFanMode != fanMode ) {
        console.log('Fan mode changed')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatFanMode)
    
        }
        this.runIn(30 * 60, temperatureCheck)
        

	})
