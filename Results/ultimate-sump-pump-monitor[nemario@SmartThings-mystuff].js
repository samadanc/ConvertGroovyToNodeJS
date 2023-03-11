
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices:', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Power Meter');
            section.deviceSetting('multi').capability(['accelerationSensor']).name('Vibration Sensor');
            section.deviceSetting('water').capability(['waterSensor']).name('Water Sensor');
            section.deviceSetting('sump').capability(['waterSensor']).name('Virtual Sump Pump (not currentl optional)');

        });


        page.section('Notification Settings', section => {
            section.numberSetting('runLength').name('How long does your sump pump run (in seconds)?');
            section.numberSetting('runsEvery').name('How often should your sump pump run (in minutes)?');
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.water, 'waterSensor', 'dry', 'incomingWaterEvents')

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'energy', 'incomingEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.water, 'waterSensor', 'wet', 'incomingWaterEvents')

        await context.api.subscriptions.subscribeToDevices(context.config.multi, 'accelerationSensor', 'acceleration.inactive', 'incomingVibrationEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'incomingEnergyEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.multi, 'accelerationSensor', 'acceleration.active', 'incomingVibrationEvent')

    })

    .subscribedEventHandler('incomingWaterEvents', (context, event) => {
        
        if (event.value == 'wet') {
        this.turnOnWetStatus()
        } else {
        this.turnOnDryStatus()
        }
        

	})

    .subscribedEventHandler('incomingEnergyEvent', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        if (currentState == 'off') {
        log.trace('Forced switch on.')
        this.send('Sump Pump power turned back on.')
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', on)
    
        }
        log.trace("Current Energy: $currentEnergy")
        log.trace("Current Power: $currentPower")
        log.trace("Current Power: $currentState")
        let isRunning = currentEnergy > state.lastEnergy || currentPower > 0
        let onOffSwitch = 'na'
        if (!state.cycleOn && isRunning ) {
        state.cycleOn = true
        this.turnOnVirtualSump()
        } else {
        if (state.cycleOn && isRunning ) {
        this.turnOnVirtualSump()
        } else {
        if (state.cycleOn && !isRunning) {
        state.cycleOn = false
        this.turnOffVirtualSump()
        }
        }
        }
        state.lastEnergy = currentEnergy
        

	})

    .subscribedEventHandler('incomingVibrationEvent', (context, event) => {
        
        if (event.value == 'active') {
        this.turnOnVirtualSump()
        } else {
        if (event.value == 'inactive') {
        this.turnOffVirtualSump()
        }
        }
        

	})
