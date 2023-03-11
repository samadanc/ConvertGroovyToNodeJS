
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device starts drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');

        });


        page.section('Notification method', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Notification method', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'energy', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        log.trace('handler')
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        log.trace("Current Energy: $currentEnergy")
        log.trace("Current Power: $currentPower")
        let isRunning = currentEnergy > state.lastEnergy || currentPower > 0
        if (!state.cycleOn && isRunning ) {
        state.cycleOn = true
        let message = 'Check your sump pump!'
        log.trace("$message")
        this.send(message)
        } else {
        if (state.cycleOn && isRunning ) {
        let message = 'Your sump pump is still running!'
        log.trace("$message")
        } else {
        if (state.cycleOn && !isRunning) {
        state.cycleOn = false
        let message = 'Your sump pump stopped running!'
        log.trace("$message")
        this.send(message)
        } else {
        log.trace('No activity.')
        }
        }
        }
        state.lastEnergy = currentEnergy
        

	})
