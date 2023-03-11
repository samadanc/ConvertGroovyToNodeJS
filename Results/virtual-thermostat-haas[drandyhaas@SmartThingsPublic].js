
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Choose a thermostat to follow... ', section => {
            section.deviceSetting('thermo').capability(['thermostat']).name('Thermostat');

        });


        page.section('Select the heater or air conditioner outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Set the desired temperature...', section => {

        });


        page.section('Set the desired temperature offset (amount added to the setpoint from the thermostat)...', section => {

        });


        page.section('When there\'s been movement from (optional, leave blank to not require motion)...', section => {
            section.deviceSetting('motion').capability(['motionSensor']).name('Motion');

        });


        page.section('Within this number of minutes...', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('But never go below (or above if A/C) this value with or without motion...', section => {

        });


        page.section('Select \'heat\' for a heater and \'cool\' for an air conditioner...', section => {
            section.enumSetting('mode').name('Heating or cooling?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermo, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermo, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        if (mode == 'cool') {
        console.log("dont care about cooling setpoint ${event.value} since we are a cooler")
        return null
        }
        console.log("set setpoint from ${state.setpoint} to ${event.value} + $setpointoffset because we are a heater")
        state.setpoint = event.doubleValue + setpointoffset .round(0)
        console.log("state.setpoint is now ${state.setpoint} ")
        this.evaluate(state.lasttemp, state.setpoint)
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        let lastTemp = sensor.currentTemperature
        if (lastTemp != null) {
        this.evaluate(lastTemp, setpoint)
        }
        } else {
        if (event.value == 'inactive') {
        let isActive = this.hasBeenRecentMotion()
        console.log("INACTIVE($isActive)")
        if (isActive || emergencySetpoint ) {
        let lastTemp = sensor.currentTemperature
        if (lastTemp != null) {
        this.evaluate(lastTemp, isActive ? setpoint : emergencySetpoint )
        }
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        if (mode == 'heat') {
        console.log("dont care about cooling setpoint ${event.value} since we are a heater")
        return null
        }
        console.log("set setpoint from ${state.setpoint} to ${event.value} + $setpointoffset because we are a cooler")
        state.setpoint = event.doubleValue + setpointoffset .round(0)
        console.log("state.setpoint is now ${state.setpoint} ")
        this.evaluate(state.lasttemp, state.setpoint)
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let isActive = this.hasBeenRecentMotion()
        if (isActive || emergencySetpoint ) {
        state.lasttemp = event.doubleValue
        this.evaluate(event.doubleValue, isActive ? state.setpoint : emergencySetpoint )
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        

	})
