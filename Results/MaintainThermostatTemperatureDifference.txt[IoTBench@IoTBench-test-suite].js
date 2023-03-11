
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This thermostat must remain greater than (or less than when on heat)...', section => {
            section.deviceSetting('sourceThermostat').capability(['thermostat']).name('Select thermostat');

        });


        page.section('This amount...', section => {

        });


        page.section('Compared to this thermostat...', section => {
            section.deviceSetting('targetThermostat').capability(['thermostat']).name('Select thermostat(s)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sourceThermostat, 'thermostat', 'coolingSetpoint', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.sourceThermostat, 'thermostat', 'heatingSetpoint', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("value: ${event.value}, ${event.name}, event: $evt, settings: $settings, handlerName: ${event.handlerName}")
        if (event.name == 'heatingSetpoint') {
        java.lang.Integer adjustedSetpoint = sourceThermostat.currentValue
        
        context.api.devices.sendCommands(context.config.targetThermostat, 'thermostat', setHeatingSetpoint)
    
        console.log("$adjustedSetpoint")
        } else {
        if (event.name == 'coolingSetpoint') {
        java.lang.Integer adjustedSetpoint = sourceThermostat.currentValue
        
        context.api.devices.sendCommands(context.config.targetThermostat, 'thermostat', setCoolingSetpoint)
    
        console.log("$adjustedSetpoint")
        }
        }
        

	})
