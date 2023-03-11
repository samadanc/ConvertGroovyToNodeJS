
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('threshold').name('Reports Above...');

        });


        page.section('', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Use This Virtual Switch');

        });


        page.section('And notify me if it hasn\'t exceeded the threshold in more than this many minutes (default 10)', section => {
            section.numberSetting('openThreshold').name('');

        });


        page.section('Delay between notifications (default 10 minutes', section => {
            section.numberSetting('frequency').name('Number of minutes');
            section.booleanSetting('pushNotification').name('Send a push notification');

        });


        page.section('Via text message at this number', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        log.trace("meterHandler(${event.name}: ${event.value})")
        let thresholdValue = (threshold as int)
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', currentState)
    
        if (meterValue > thresholdValue ) {
        console.log("$meter reported energy consumption above $threshold.")
        if (switchState.value != 'on') {
        console.log("$switch1 not on. Turning on.")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        this.unschedule(offTooLong)
        }
        } else {
        console.log("$meter reported energy consumption below $threshold.")
        if (switchState.value != 'off') {
        console.log("$switch1 not off. Turning off.")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        let delay = openThreshold != null && openThreshold != '' ? openThreshold * 60 : 600
        this.runIn(delay, offTooLong, ['overwrite': true])
        

	})
