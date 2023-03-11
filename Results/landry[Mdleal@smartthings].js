
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this device stops drawing power', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('');
            section.numberSetting('cycle_start_power_threshold').name('Start cycle when power consumption goes above (W)');
            section.numberSetting('cycle_end_power_threshold').name('Stop cycle when power consumption drops below (W) ...');
            section.numberSetting('cycle_end_wait').name('... for at least this long (min)');

        });


        page.section('Send this message', section => {
            section.textSetting('message').name('Notification message');

        });


        page.section('Notification method', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['hidden': this.hideOptionsSection(), 'hideable': true], 'Additionally', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn on/off this switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        log.trace("Power: $latestPowerW")
        log.trace("state.cycleOn: ${state.cycleOn}")
        log.trace("cycle_start_power_threshold: $cycle_start_power_threshold")
        if (!state.cycleOn && latestPower > cycle_start_power_threshold ) {
        this.cycleOn(evt)
        } else {
        if (state.cycleOn && latestPower <= cycle_end_power_threshold ) {
        this.runIn(cycle_end_wait * 60, cycleOff)
        }
        }
        

	})
