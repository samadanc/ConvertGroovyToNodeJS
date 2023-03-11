
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when there\'s motion...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor1').capability(['temperatureMeasurement']).name('Temp Sensor');

        });


        page.section('When the temperature is above...', section => {
            section.numberSetting('temperature1').name('Temp?');

        });


        page.section('And windspeed is below...', section => {
            section.numberSetting('wind1').name('Wind (mph)?');

        });


        page.section('And off when there\'s been no motion for...', section => {
            section.numberSetting('minutes1').name('Minutes?');

        });


        page.section('Turn on/off switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Your Zipcode...', section => {
            section.textSetting('zipcode').name('Zipcode?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        let data = this.getWeatherFeature('conditions', zipcode)
        console.log("Current windspeed in $zipcode is ${data.current_observation.wind_mph} mph")
        if (event.value == 'active') {
        let lastTemp = sensor1.currentTemperature
        if (lastTemp >= temperature1 ) {
        let lastWindspeed = data.current_observation.wind_mph
        if (lastWindspeed <= wind1 ) {
        console.log('turning on lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.inactiveAt = null
        }
        }
        } else {
        if (event.value == 'inactive') {
        if (!state.inactiveAt) {
        state.inactiveAt = this.now()
        }
        }
        }
        

	})

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        console.log("schedule check, ts = ${state.inactiveAt}")
        if (state.inactiveAt) {
        let elapsed = this.now() - state.inactiveAt
        let threshold = 1000 * 60 * minutes1
        if (elapsed >= threshold ) {
        console.log('turning off lights')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        state.inactiveAt = null
        } else {
        console.log("${(elapsed / 1000)} sec since motion stopped")
        }
        }
        

	})
