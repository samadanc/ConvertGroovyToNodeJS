
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the heater or air conditioner outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Set the Min temperature...', section => {

        });


        page.section('Set the Max temperature...', section => {

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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        let isActive = this.hasBeenRecentMotion()
        if (event.value == 'active') {
        let lastTemp = sensor.currentTemperature
        if (lastTemp != null) {
        this.evaluate(lastTemp, isActive)
        }
        } else {
        if (event.value == 'inactive') {
        console.log("INACTIVE($isActive)")
        if (isActive || emergencySetpoint ) {
        let lastTemp = sensor.currentTemperature
        if (lastTemp != null) {
        this.evaluate(lastTemp, isActive)
        }
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("Mode changed to ${event.value}")
        let isActive = this.hasBeenRecentMotion()
        if (isActive) {
        this.evaluate(sensor.currentTemperature)
        } else {
        if (!motion) {
        this.evaluate(sensor.currentTemperature)
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("Current temperature ${event.doubleValue}")
        let isActive = this.hasBeenRecentMotion()
        if (isActive) {
        this.evaluate(event.doubleValue, isActive)
        } else {
        if (!motion) {
        this.evaluate(event.doubleValue, isActive)
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        }
        }
        

	})
