
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device stops drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');

        });


        page.section('['hidden': true, 'hideable': true], 'Advanced options', section => {
            section.numberSetting('upperThreshold').name('start when power raises above (W)');
            section.numberSetting('lowerThreshold').name('stop when power drops below (W)');

        });


        page.section('Send this message', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('Notification method', section => {

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.numberSetting('interval').name('Polling interval in minutes:');

        });


        page.section(''Version 1.2'', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('tickler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'powerHandler')

    })

    .subscribedEventHandler('powerHandler', (context, event) => {
        
        if (state.debug) {
        console.log("power evt: $evt")
        console.log("state: $state")
        }
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        log.trace("Power: $currPowerW")
        if (!state.cycleOn && currPower > upperThreshold ) {
        state.cycleOn = true
        state.cycleStart = this.now()
        log.trace('Cycle started.')
        } else {
        if (state.cycleOn && currPower <= lowerThreshold ) {
        this.send(message)
        state.cycleOn = false
        state.cycleEnd = this.now()
        let duration = state.cycleEnd - state.cycleStart
        log.trace("Cycle ended after $duration minutes.")
        }
        }
        

	})

    .scheduledEventHandler('tickler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', poll)
    
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        if (state.debug && currPower > upperThreshold ) {
        console.log("Power $currPowerW above threshold of $upperThresholdW")
        } else {
        if (state.debug && currPower <= lowerThreshold ) {
        console.log("Power $currPowerW below threshold of $lowerThresholdW")
        }
        }
        

	})
