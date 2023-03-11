
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configure', section => {
            section.textSetting('xi_apikey').name('Xively API Key');
            section.numberSetting('xi_feed').name('Xively Feed ID');
            section.deviceSetting('thermostat1').capability(['thermostat ']).name('Select thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat1, 'thermostat ', 'thermostatOperatingState', 'handleThermostatOperatingState')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat1, 'thermostat ', 'temperature', 'handleThermostatTemperature')

    })

    .subscribedEventHandler('handleThermostatTemperature', (context, event) => {
        
        console.log("Tempreature event: ${event.value}")
        this.writeChannelData(xi_feed, 'Temperature', event.value)
        

	})

    .subscribedEventHandler('handleThermostatOperatingState', (context, event) => {
        
        console.log("OperatingState event: ${event.value}")
        let opState = 0
        if (event.value == 'heating') {
        opState = 1
        } else {
        if (event.value == 'cooling') {
        opState = -1
        }
        }
        this.writeChannelData(xi_feed, 'OperatingState', opState)
        

	})
