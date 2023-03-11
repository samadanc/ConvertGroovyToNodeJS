
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


        page.section('Flash lights (optional)', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 3)');
            section.numberSetting('onFor').name('On for milliseconds (default 1000)');
            section.numberSetting('offFor').name('Off for milliseconds (default 1000)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.meter, 'powerMeter', currentValue)
    
        log.trace("Power: $latestPowerW")
        if (!state.cycleOn && latestPower > cycle_start_power_threshold ) {
        this.cycleOn(evt)
        } else {
        if (state.cycleOn && latestPower <= cycle_end_power_threshold ) {
        console.log('Power below threshold. Scheduling end cycle')
        this.runIn(cycle_end_wait * 60, cycleOff)
        }
        }
        

	})
