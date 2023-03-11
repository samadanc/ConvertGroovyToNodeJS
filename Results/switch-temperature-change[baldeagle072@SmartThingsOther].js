
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.numberSetting('newHeatingSetpoint').name('Heating Setpoint');
            section.numberSetting('newCoolingSetpoint').name('Cooling Setpoint');
            section.deviceSetting('switch1').capability(['switch']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onSwitchHandler')

    })

    .subscribedEventHandler('offSwitchHandler', (context, event) => {
        
        console.log("state.originalHeatingSetpoint[0]: ${state.originalHeatingSetpoint[0]}")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setHeatingSetpoint)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setCoolingSetpoint)
    
        

	})

    .subscribedEventHandler('onSwitchHandler', (context, event) => {
        
        state.originalHeatingSetpoint = thermostat.latestValue
        state.originalCoolingSetpoint = thermostat.latestValue
        if (newHeatingSetpoint) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setHeatingSetpoint)
    
        }
        if (newCoolingSetpoint) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', setCoolingSetpoint)
    
        }
        

	})
