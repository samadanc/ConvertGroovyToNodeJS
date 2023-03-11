
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor This Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which thermostat?');

        });


        page.section('Send Pushover alert (optional)', section => {
            section.textSetting('apiKey').name('IFTTT API Key');
            section.textSetting('makerEvent').name('IFTTT Event Name');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'thermostatHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'thermostatHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatSetpoint', 'thermostatHandler')

    })

    .subscribedEventHandler('thermostatHandler', (context, event) => {
        
        console.log("Event Name: ${event.name}, Event Value:  ${event.value}")
        let apiURL = "https://maker.ifttt.com/trigger/$makerEvent/with/key/$apiKey"
        try {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', httpPost)
    
        console.log(response.data)
        })
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})
