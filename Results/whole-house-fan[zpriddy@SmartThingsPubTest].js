
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');

        });


        page.section('Indoor', section => {
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');
            section.deviceSetting('fans').capability(['switch']).name('Vent Fan');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'checkThings')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
        let outsideTemp = settings.outTemp.currentValue
        let insideTemp = settings.inTemp.currentValue
        let thermostatMode = settings.thermostat.currentValue
        console.log("Inside: $insideTemp, Outside: $outsideTemp, Thermostat: $thermostatMode")
        let shouldRun = true
        if (thermostatMode != 'off') {
        console.log('Not running due to thermostat mode')
        shouldRun = false
        }
        if (insideTemp < outsideTemp ) {
        console.log('Not running due to insideTemp > outdoorTemp')
        shouldRun = false
        }
        if (insideTemp < settings.minTemp) {
        console.log('Not running due to insideTemp < minTemp')
        shouldRun = false
        }
        if (shouldRun && !state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.fanRunning = true
        } else {
        if (!shouldRun && state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        state.fanRunning = false
        }
        }
        

	})
