
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change the setpoint of which thermostat:', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Based on which virtual dimmer:', section => {
            section.deviceSetting('switchDevice').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchDevice, 'switchLevel', 'level', 'setPointHandler')

    })

    .subscribedEventHandler('setPointHandler', (context, event) => {
        
        console.log("Setpoint being changed to ${event.value}...")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setTemperature)
    
        

	})
