
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When switch on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Choose Thermostat(s)', section => {
            section.deviceSetting('thermostat1').capability(['thermostat']).name('');

        });


        page.section('Minutes...', section => {
            section.numberSetting('minutes').name('Minutes');

        });


        page.section('Set Target temperature', section => {

        });


        page.section('Default temperatures', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'turnOnThermostat')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'turnOffThermostat')

    })

    .subscribedEventHandler('turnOnThermostat', (context, event) => {
        
        state.lastStatus = 'on'
        if
        
        context.api.devices.sendCommands(context.config.thermostat1, 'thermostat', setCoolingSetpoint)
    
        state.lastSet = 'cool'
        } else {
        
        context.api.devices.sendCommands(context.config.thermostat1, 'thermostat', setHeatingSetpoint)
    
        state.lastSet = 'heat'
        }
        let delay = 60 * minutes
        this.runIn(delay, switchOff)
        

	})

    .subscribedEventHandler('turnOffThermostat', (context, event) => {
        
        state.lastStatus = 'off'
        if (state.lastSet == 'cool') {
        
        context.api.devices.sendCommands(context.config.thermostat1, 'thermostat', setCoolingSetpoint)
    
        } else {
        
        context.api.devices.sendCommands(context.config.thermostat1, 'thermostat', setHeatingSetpoint)
    
        }
        

	})
