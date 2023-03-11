
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor...', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temprature sensor');

        });


        page.section('Select the fan to control...', section => {
            section.deviceSetting('fan').capability(['switch']).name('Fan');

        });


        page.section('Turn on/off at what temperature?', section => {
            section.numberSetting('setpoint').name('Temperature');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkTemperature', delay);

    })

    .scheduledEventHandler('checkTemperature', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sensor, 'temperatureMeasurement', currentValue)
    
        
        context.api.devices.sendCommands(context.config.fan, 'switch', currentState)
    
        if (currentTemp > setpoint && currentState == 'off') {
        
        context.api.devices.sendCommands(context.config.fan, 'switch', on)
    
        log.trace("Current temperature is $currentTemp, target temp is $setpoint.  Turning fan on.")
        } else {
        if (currentTemp < setpoint && currentState == 'on') {
        
        context.api.devices.sendCommands(context.config.fan, 'switch', off)
    
        log.trace("Current temperature is $currentTemp, target temp is $setpoint.  Turning fan off.")
        }
        }
        

	})
