
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the Thermostat Operating State of:', section => {
            section.deviceSetting('thermostatSensor1').capability(['thermostat']).name('');

        });


        page.section('Control Switch:', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostatSensor1, 'thermostat', 'thermostatOperatingState', 'thermostatHandler')

    })

    .subscribedEventHandler('thermostatHandler', (context, event) => {
        
        log.trace("thermostatOperatingState: ${event.value}")
        let currentState = event.value
        let mySwitch = settings.switch1
        if (currentState == 'idle') {
        console.log("$currentState: turning switch off")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if (currentState == 'heating') {
        console.log("$currentState: turning switch on")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        console.log("$currentState: turning switch off")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        

	})
