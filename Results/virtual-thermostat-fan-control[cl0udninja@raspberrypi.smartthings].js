
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the heater or air conditioner outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switchLevel']).name('Fan');
            section.numberSetting('level').name('Speed');

        });


        page.section('Set the desired temperature...', section => {

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

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'motionSensor', 'motion', 'motionHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

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
        
        context.api.devices.sendCommands(context.config.outlets, 'switchLevel', off)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let isActive = this.hasBeenRecentMotion()
        if (isActive || emergencySetpoint ) {
        this.evaluate(event.doubleValue, isActive ? setpoint : emergencySetpoint )
        } else {
        
        context.api.devices.sendCommands(context.config.outlets, 'switchLevel', off)
    
        }
        

	})
