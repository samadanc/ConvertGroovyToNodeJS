
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Select Vents (on/off)', section => {
            section.deviceSetting('theVents').capability(['switch']).name('');

        });


        page.section('Select Vents (levels)', section => {
            section.deviceSetting('theVentsLevels').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'thermostatOSHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'thermostatModeHandler')

    })

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        console.log("Thermostat Mode Changed: ${event.value}")
        if (event.value == 'heat') {
        console.log('Closing vents...')
        
        context.api.devices.sendCommands(context.config.theVents, 'switch', off)
    
        } else {
        if (event.value == 'cool') {
        console.log('Opening vents...')
        
        context.api.devices.sendCommands(context.config.theVents, 'switch', on)
    
        for (let ventLevel : theVentsLevels ) {
        if (ventLevel.level == 0) {
        ventLevel.setLevel(100)
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('thermostatOSHandler', (context, event) => {
        
        console.log("Thermostat Operating State Changed: ${event.value}")
        if (event.value == 'heating') {
        console.log('Closing vents...')
        
        context.api.devices.sendCommands(context.config.theVents, 'switch', off)
    
        } else {
        if (event.value == 'cooling') {
        console.log('Opening vents...')
        
        context.api.devices.sendCommands(context.config.theVents, 'switch', on)
    
        for (let ventLevel : theVentsLevels ) {
        if (ventLevel.level == 0) {
        ventLevel.setLevel(100)
        }
        }
        }
        }
        

	})
