
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Thermometer', section => {
            section.deviceSetting('thermometer').capability(['temperatureMeasurement']).name('Select');

        });


        page.section('Choose Thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Select');

        });


        page.section('Set heating maximum value (<=28)', section => {

        });


        page.section('Set heating minimum value (>8)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermometer, 'temperatureMeasurement', 'heatingSetpoint', 'setPointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermometer, 'temperatureMeasurement', 'temperature', 'tempHandler')

    })

    .subscribedEventHandler('setPointHandler', (context, event) => {
        
        if (event.isPhysical()) {
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Thermometer ${event.displayName} Physical Changed State: $isStateChange")
        } else {
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Thermometer ${event.displayName} non-Physical Changed State: $isStateChange")
        }
        let result = this.demandCheck(event.device)
        

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        console.log("Temp report ${event.displayName} ${event.value}C")
        let result = this.demandCheck(event.device)
        

	})
