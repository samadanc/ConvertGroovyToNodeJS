
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose water leak sensors', section => {
            section.deviceSetting('leakSensors').capability(['waterSensor']).name('');

        });


        page.section('Choose the thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.leakSensors, 'waterSensor', 'water.wet', 'leakHandler')

    })

    .subscribedEventHandler('leakHandler', (context, event) => {
        
        console.log("one of the configured leak sensors changed states: $evt")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        

	})
