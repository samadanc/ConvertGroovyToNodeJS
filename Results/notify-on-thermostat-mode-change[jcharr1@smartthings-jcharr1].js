
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'thermostatOSHandler')

    })

    .subscribedEventHandler('thermostatOSHandler', (context, event) => {
        
        console.log("Thermostat Operating State Changed: ${event.value}")
        this.sendPush("${thermostat.displayName} is now ${event.value}")
        

	})
