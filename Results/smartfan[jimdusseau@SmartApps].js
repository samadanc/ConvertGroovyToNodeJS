
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Choose your fans...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('What is your zip code?', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


        page.section('Turn fan off when it\'s colder than ', section => {
            section.numberSetting('lowTemp').name('Degrees F');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        let data = this.getWeatherFeature('conditions', zipcode)
        console.log("Outside temp = ${data.current_observation.temp_f}  and internal temp = ${sensor.currentTemperature}")
        let internalTemp = sensor.currentTemperature
        let warmerOutside = data.current_observation.temp_f > internalTemp
        console.log("warmer outside: $warmerOutside Internal temp: $internalTemp low temp: $lowTemp")
        if (!warmerOutside && internalTemp > lowTemp ) {
        console.log('Fans should be on')
        if (state.fanState != 1) {
        console.log('Turning fans on')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.fanState = 1
        } else {
        console.log('Fans are already on')
        }
        } else {
        console.log('Fans should be off')
        if (state.fanState != 0) {
        console.log('Turning fans off')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        state.fanState = 0
        } else {
        console.log('Fans are already off')
        }
        }
        

	})
