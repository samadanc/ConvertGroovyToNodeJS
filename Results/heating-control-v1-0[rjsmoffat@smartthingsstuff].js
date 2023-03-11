
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose Thermostats', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('Select');

        });


        page.section('Choose Actuator', section => {
            section.deviceSetting('actuator').capability(['switch']).name('Select one');

        });


        page.section('Choose Override Switch', section => {
            section.deviceSetting('override').capability(['switch']).name('Select one');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'temperature', 'tempHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'heatingSetpoint', 'setPointHandler')

    })

    .subscribedEventHandler('setPointHandler', (context, event) => {
        
        if (event.isPhysical()) {
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Radiator ${event.displayName} Physical Changed State: $isStateChange")
        } else {
        java.lang.Boolean isStateChange = event.isStateChange()
        console.log("Radiator ${event.displayName} non-Physical Changed State: $isStateChange")
        }
        let result = this.demandCheck(event.device)
        

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        console.log("Temp report ${event.displayName} ${event.value}C")
        let result = this.demandCheck(event.device)
        

	})
