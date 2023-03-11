
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


        page.section('Helper heaters... ', section => {
            section.deviceSetting('heaters').capability(['switch']).name('Heaters');

        });


        page.section('Mode #1 temperature control', section => {
            section.numberSetting('heatingSetpoint1').name('Heating temp (F)?');
            section.numberSetting('coolingSetpoint1').name('Cooling temp (F)?');

        });


        page.section('Mode #2 temperature control', section => {
            section.numberSetting('heatingSetpoint2').name('Heating temp (F)?');
            section.numberSetting('coolingSetpoint2').name('Cooling temp (F)?');

        });


        page.section('Mode #3 temperature control', section => {
            section.numberSetting('heatingSetpoint3').name('Heating temp (F)?');
            section.numberSetting('coolingSetpoint3').name('Cooling temp (F)?');

        });


        page.section('Away temperature control', section => {
            section.numberSetting('heatingSetpointAway').name('Heating temp (F)?');
            section.numberSetting('coolingSetpointAway').name('Cooling temp (F)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'temperature', 'temperatureHandler')

        context.api.schedules.runIn('keepAlive', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thermostat, 'thermostat', 'thermostatOperatingState', 'operatingStateHandler')

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
        console.log("[PollerEvent] keepAliveLatest == ${state.keepAliveLatest}; latestSetCoolingSetpoint == ${state.latestSetCoolingSetpoint}; latestTurnOnAuxHeaters == ${state.latestTurnOnAuxHeaters}; latestDoUpdateTempSettings == ${state.latestDoUpdateTempSettings}; now() == ${this.now()}")
        if (state.latestSetCoolingSetpoint && this.now() - state.latestSetCoolingSetpoint > 100000) {
        log.error('Waking up setCoolingSetpoint')
        this.setCoolingSetpoint()
        }
        if (state.latestTurnOnAuxHeaters && this.now() - state.latestTurnOnAuxHeaters > 31 * 60 * 1000) {
        log.error('Waking up turnOnAuxHeaters')
        this.turnOnAuxHeaters()
        }
        if (state.latestDoUpdateTempSettings && this.now() - state.latestDoUpdateTempSettings > 60000) {
        log.error('Waking up doUpdateTempSettings')
        this.doUpdateTempSettings()
        }
        if (state.keepAliveLatest && this.now() - state.keepAliveLatest > 360000) {
        log.error('Waking up timer')
        this.keepAlive()
        }
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', log)
    
        if
        console.log('Set mode to cool')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', cool)
    
        }
        

	})

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("currentTemperature: ${event.value}, $settings")
        this.handleHelperHeaters()
        if
        console.log('Set mode to heat')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', heat)
    
        } else {
        if
        console.log('Set mode to cool')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', cool)
    
        }
        }
        

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', log)
    
        this.handleHelperHeaters()
        if
        console.log('Set mode to heat')
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', heat)
    
        }
        

	})

    .subscribedEventHandler('operatingStateHandler', (context, event) => {
        
        console.log("thermostatOperatingState: ${event.value}")
        if (heaters) {
        try {
        this.unschedule(turnOnAuxHeaters)
        }
        catch (let e) {
        log.error("Ignoring error: $e")
        }
        if
        log.info('Themostat not heating; shutting down any aux heat')
        
        context.api.devices.sendCommands(context.config.heaters, 'switch', off)
    
        } else {
        if (event.value == 'heating') {
        let minutes = 30
        log.info("Themostat started heating; turn on heaters in $minutes minutes if not done")
        state.latestTurnOnAuxHeaters = this.now()
        this.runIn(minutes * 60, turnOnAuxHeaters)
        }
        }
        }
        

	})

    .scheduledEventHandler('keepAlive', (context, event) => {
        
        console.log('Polling')
        this.runIn(300, keepAlive, ['overwrite': true])
        console.log("[Polling] keepAliveLatest == ${state.keepAliveLatest}")
        state.keepAliveLatest = this.now()
        console.log("[Polling] keepAliveLatest == ${state.keepAliveLatest}; now() == ${this.now()}")
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', poll)
    
        if (state.latestMode == null || state.latestMode == mode1 || state.latestMode == mode2 || state.latestMode == mode3 ) {
        if (!state.latestMode || state.latestMode != location.currentMode.name) {
        if (state.modifiedLatestMode == location.mode) {
        log.warn("Mode has changed to ${location.mode} (checked twice); update settings")
        this.doUpdateTempSettings()
        } else {
        state.modifiedLatestMode = location.mode
        log.warn("Mode seems to have changed (to ${location.mode}); but let's wait one more polling cycle...")
        }
        } else {
        state.latestMode = location.currentMode.name
        state.modifiedLatestMode = null
        }
        } else {
        state.modifiedLatestMode = null
        }
        

	})

    .scheduledEventHandler('initialize', (context, event) => {
        
        console.log('Initializing')
        console.log('Initial settings update')
        this.doUpdateTempSettings()
        

	})
