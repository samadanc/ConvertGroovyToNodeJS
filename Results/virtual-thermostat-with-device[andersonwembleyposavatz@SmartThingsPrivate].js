
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


        page.section('Only heat when contact(s) arent open (optional, leave blank to not require contact sensor)...', section => {
            section.deviceSetting('motion').capability(['contactSensor']).name('Contact');

        });


        page.section('Never go below this temperature: (optional)', section => {

        });


        page.section('Temperature Threshold (Don\'t allow heating to go above or bellow this amount from set temperature)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion, 'contactSensor', 'contact', 'motionHandler')

    })

    .subscribedEventHandler('thermostatTemperatureHandler', (context, event) => {
        
        this.handleChange()
        

	})

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        this.handleChange()
        

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        this.handleChange()
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.handleChange()
        

	})
