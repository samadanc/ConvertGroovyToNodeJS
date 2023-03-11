
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor(s)... (If multiple sensors are selected, the average value will be used)', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the heater outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Only heat when contact isnt open (optional, leave blank to not require contact sensor)...', section => {
            section.deviceSetting('motion').capability(['contactSensor']).name('Contact');

        });


        page.section('Never go below this temperature: (optional)', section => {

        });


        page.section('Temperature Threshold (Don\'t allow heating to go above or bellow this amount from set temperature)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        context.api.schedules.runEvery1Hour('updateTimings', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'contactSensor', 'contact', 'motionHandler')

    })

    .subscribedEventHandler('thermostatTemperatureHandler', (context, event) => {
        
        let temperature = event.doubleValue
        console.log("Desired Temperature set to: $temperature ${state.contact}")
        let thisTemp = this.getAverageTemperature()
        if (state.contact) {
        this.evaluate(thisTemp, temperature)
        } else {
        this.heatingOff()
        }
        

	})

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        let mode = event.value
        console.log("Mode Changed to: $mode")
        let thermostat = this.getThermostat()
        let thisTemp = this.getAverageTemperature()
        if (state.contact) {
        this.evaluate(thisTemp, thermostat.currentValue('thermostatSetpoint'))
        } else {
        this.heatingOff(mode == 'heat' ? false : true)
        }
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let thermostat = this.getThermostat()
        if (event.value == 'closed') {
        state.contact = true
        let thisTemp = this.getAverageTemperature()
        if (thisTemp != null) {
        this.evaluate(thisTemp, thermostat.currentValue('thermostatSetpoint'))
        state.lastTemp = thisTemp
        }
        } else {
        if (event.value == 'open') {
        console.log('should turn heating off')
        state.contact = false
        this.heatingOff()
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let thermostat = this.getThermostat()
        thermostat.setVirtualTemperature(this.getAverageTemperature())
        if (state.contact || emergencySetpoint ) {
        this.evaluate(event.doubleValue, thermostat.currentValue('thermostatSetpoint'))
        state.lastTemp = event.doubleValue
        } else {
        this.heatingOff()
        }
        

	})

    .scheduledEventHandler('updateTimings', (context, event) => {
        
        let date = new Date().format('dd-MM-yy')
        if (state.current == 'on') {
        java.lang.Integer time = Math.round(new Date().getTime() / 1000) - state.lastOn
        state.todayTime = state.todayTime + time
        state.lastOn = Math.round(new Date().getTime() / 1000)
        }
        if (state.date != date ) {
        state.yesterdayTime = state.todayTime
        state.date = date
        state.todayTime = 0
        }
        thermostat.setTimings(state.todayTime, state.yesterdayTime)
        

	})
