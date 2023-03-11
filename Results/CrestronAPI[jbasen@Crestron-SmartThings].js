
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trigger API Updates when these devices change state...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'coolingSetpoint', 'handleCoolingSetpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatFanMode', 'handleFanModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmers, 'switchLevel', 'level', 'dimmersHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'heatingSetpoint', 'handleHeatingSetpointEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'thermostatMode', 'handleThermostatModeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchesHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostats, 'thermostat', 'temperature', 'handleTemperatureEvent')

    })

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        console.log('thermostatsHandler success')
        console.log("handleTemperatureEvent ${event.value}")
        this.SendUpdate("/${event.deviceId}/=temperature=${event.value}")
        

	})

    .subscribedEventHandler('handleFanModeEvent', (context, event) => {
        
        console.log('thermostatsHandler success')
        console.log("handleFanModeEvent ${event.value}")
        this.SendUpdate("/${event.deviceId}/=FanMode=${event.value}")
        

	})

    .subscribedEventHandler('switchesHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.SendUpdate("/${event.deviceId}/on")
        } else {
        if (event.value == 'off') {
        this.SendUpdate("/${event.deviceId}/off")
        }
        }
        

	})

    .subscribedEventHandler('handleCoolingSetpointEvent', (context, event) => {
        
        console.log('thermostatsHandler success')
        console.log("handleCoolingSetpointEvent ${event.value}")
        this.SendUpdate("/${event.deviceId}/=CoolSP=${event.value}")
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        this.SendUpdate("/${event.deviceId}/present")
        } else {
        if (event.value == 'not present') {
        this.SendUpdate("/${event.deviceId}/not present")
        }
        }
        

	})

    .subscribedEventHandler('dimmersHandler', (context, event) => {
        
        if (event.value != null) {
        this.SendUpdate("/${event.deviceId}/${event.value}")
        }
        

	})

    .subscribedEventHandler('handleHeatingSetpointEvent', (context, event) => {
        
        console.log('thermostatsHandler success')
        this.SendUpdate("/${event.deviceId}/=HeatSP=${event.value}")
        

	})

    .subscribedEventHandler('handleThermostatModeEvent', (context, event) => {
        
        console.log('thermostatsHandler success')
        console.log("handleThermostatModeEvent ${event.value}")
        this.SendUpdate("/${event.deviceId}/=SystemMode=${event.value}")
        

	})
