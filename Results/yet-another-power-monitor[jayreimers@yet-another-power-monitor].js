
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


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


        page.section('Sonos', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Sonos player');
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');
            section.numberSetting('volume').name('Temporarily change volume');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.numberSetting('interval').name('Polling interval in minutes:');

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
        if (currPower > upperThreshold && !atomicState.cycleStart) {
        atomicState.cycleStart = this.now()
        log.trace('Cycle started.')
        } else {
        if (currPower <= lowerThreshold && atomicState.cycleStart) {
        let duration = this.now() - state.cycleStart
        atomicState.cycleStart = null
        log.trace("Cycle ended after $duration milliseconds.")
        if (state.duration) {
        let d = new Date(duration)
        let h = d.getHours()
        let m = d.getMinutes()
        let s = d.getSeconds()
        let msg = "$message - Cycle ended after " + "$h:".padLeft(3, '0') + "$m:".padLeft(3, '0') + "$s".padLeft(2, '0') + ' (HH:MM:SS)'
        this.send(msg)
        } else {
        this.send(message)
        }
        if (sonos) {
        this.speakMessage()
        }
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
