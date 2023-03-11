
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Outdoor', section => {
            section.deviceSetting('outTemp').capability(['temperatureMeasurement']).name('Outdoor Thermometer');
            section.numberSetting('offsetTemp').name('Outdoor Temperature Offset');

        });


        page.section('Indoor', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.deviceSetting('inTemp').capability(['temperatureMeasurement']).name('Indoor Thermometer');
            section.numberSetting('minTemp').name('Minimum Indoor Temperature');
            section.deviceSetting('windows').capability(['contactSensor']).name('Open Windows');
            section.deviceSetting('fans').capability(['switch']).name('Vent Fan');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.inTemp, 'temperatureMeasurement', 'temperature', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'checkThings')

        await context.api.subscriptions.subscribeToDevices(context.config.windows, 'contactSensor', 'contact', 'checkThings')

    })

    .subscribedEventHandler('checkThings', (context, event) => {
        
        let outsideTemp = settings.outTemp.currentValue
        let insideTemp = settings.inTemp.currentValue
        let thermostatMode = settings.thermostat.currentValue
        let openWindow = !windows || !
        console.log("Inside: $insideTemp, Outside: $outsideTemp, Thermostat: $thermostatMode, Windows: $openWindow $windows")
        let shouldRun = true
        if (insideTemp <= outsideTemp + offsetTemp ) {
        console.log('Not running due to insideTemp < outdoorTemp')
        shouldRun = false
        }
        if (insideTemp <= settings.minTemp) {
        console.log('Not running due to insideTemp < minTemp')
        shouldRun = false
        }
        if (windows != null) {
        if (openWindow) {
        console.log('Not running due to windows closed')
        shouldRun = false
        }
        }
        if (shouldRun && !state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', on)
    
        state.fanRunning = true
        console.log('Adjusting thermostat settings.')
        state.thermostatMode = thermostat.currentValue
        state.changed = true
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        console.log("State: $state")
        } else {
        if (!shouldRun && state.fanRunning) {
        
        context.api.devices.sendCommands(context.config.fans, 'switch', off)
    
        state.fanRunning = false
        console.log("Setting thermostat to ${state.thermostatMode}")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setThermostatMode)
    
        state.changed = false
        }
        }
        

	})
