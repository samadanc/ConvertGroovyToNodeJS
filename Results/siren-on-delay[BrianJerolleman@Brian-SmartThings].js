
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on siren when this is turned on:', section => {
            section.deviceSetting('theTriggerSiren').capability(['alarm']).name('Siren?');

        });


        page.section('Turn off after this number of seconds:', section => {
            section.numberSetting('seconds').name('Seconds?');

        });


        page.section('Turn on this siren:', section => {
            section.deviceSetting('theRealSiren').capability(['alarm']).name('');

        });


        page.section('Blink these switches:', section => {
            section.deviceSetting('blinkSwitches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theTriggerSiren, 'alarm', 'alarm.off', 'sirenStoppedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theTriggerSiren, 'alarm', 'alarm.both', 'sirenStartedHandler')

    })

    .subscribedEventHandler('sirenStoppedHandler', (context, event) => {
        
        console.log("sirenStoppedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theRealSiren, 'alarm', off)
    
        

	})

    .subscribedEventHandler('sirenStartedHandler', (context, event) => {
        
        console.log("sirenStartedHandler called: $evt")
        this.runIn(seconds, startSiren)
        blinkSwitches*.off(['delay': 3000])
        blinkSwitches*.on(['delay': 6000])
        blinkSwitches*.off(['delay': 9000])
        blinkSwitches*.on(['delay': 12000])
        

	})
