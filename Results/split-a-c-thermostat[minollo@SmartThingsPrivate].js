
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Poller device...', section => {
            section.deviceSetting('pollerDevice').capability(['battery']).name('');

        });


        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Temperature control', section => {
            section.booleanSetting('appEnabled').name('Enabled?');
            section.enumSetting('mode').name('');
            section.deviceSetting('outsideTemperature').capability(['temperatureMeasurement']).name('Outside Temperature');
            section.numberSetting('heatingSetpoint').name('Heating temp (F)?');
            section.numberSetting('maxExternalTempForHeat').name('Maximum outside temp for heating (F)?');
            section.numberSetting('coolingSetpoint').name('Cooling temp (F)?');
            section.numberSetting('minExternalTempForCool').name('Minimum outside temp for cooling (F)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        context.api.schedules.runIn('keepAlive', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outsideTemperature, 'temperatureMeasurement', 'temperature', 'outsideTemperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pollerDevice, 'battery', 'battery', 'pollerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatMode', 'thermostatModeHandler')

        context.api.schedules.runIn('initialize', delay);

    })

    .subscribedEventHandler('thermostatModeHandler', (context, event) => {
        
        console.log("thermostatModeHandler: ${event.value}, $settings")
        

	})

    .subscribedEventHandler('pollerEvent', (context, event) => {
        
        console.log('[PollerEvent]')
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 900000) {
        log.error('Waking up timer')
        this.keepAlive()
        }
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        console.log("coolingSetpoint: ${event.value}, $settings")
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("temperature: ${event.value}, $settings")
        

	})

    .subscribedEventHandler('outsideTemperatureHandler', (context, event) => {
        
        if (appEnabled) {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', log)
    
        if (state.lastChangeTime && this.now() - state.lastChangeTime < 3600000) {
        log.warn('Ignoring event as state was changed less than one hour ago')
        } else {
        if
        log.info('Outside temperature below minimum set temperature; shutting down unit')
        state.lastChangeTime = this.now()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        } else {
        if
        log.info('Outside temperature above maximum set temperature; shutting down unit')
        state.lastChangeTime = this.now()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        } else {
        if
        log.info('Outside temperature in working range; resuming unit to cool')
        state.lastChangeTime = this.now()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', on)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        } else {
        if
        log.info('Outside temperature in working range; resuming unit to heat')
        state.lastChangeTime = this.now()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', on)
    
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        }
        }
        }
        }
        }
        }
        

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        console.log("heatingSetpoint: ${event.value}, $settings")
        

	})

    .scheduledEventHandler('keepAlive', (context, event) => {
        
        console.log('keepAlive')
        this.runIn(600, keepAlive)
        state.keepAliveLatest = this.now()
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        console.log('Initializing')
        this.doUpdateTempSettings(location.mode)
        

	})
