
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Meter', section => {
            section.deviceSetting('minerMeter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('thresholdLow').name('Either drops to...');
            section.numberSetting('thresholdHigh').name('Or rises to...');

        });


        page.section('Power Switch', section => {
            section.deviceSetting('minerSwitches').capability(['switch']).name('Turn Off These Switches Powering Mining Equipment');
            section.numberSetting('coolOff').name('For how many minutes?');
            section.numberSetting('waitForIt').name('Allow how many minutes for startup?');

        });


        page.section(''History'', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.minerMeter, 'powerMeter', 'power', 'minerMeterHandler')

    })

    .subscribedEventHandler('minerMeterHandler', (context, event) => {
        
        let minerMeterValue = (event.value as double)
        let thresholdLowValue = (thresholdLow as int)
        let thresholdHighValue = (thresholdHigh as int)
        state.lastMeterValue = minerMeterValue
        if (!state.waitingForStartup) {
        if (minerMeterValue <= thresholdLowValue || minerMeterValue >= thresholdHighValue ) {
        state.waitingForStartup = true
        state.lastBadMeterValue = minerMeterValue
        state.lastBadMeterDate = new Date()
        let msg = "$minerMeter reported energy consumption of $minerMeterValue which is not between $thresholdLow and $thresholdHigh. Turning off $minerSwitches."
        console.log(msg)
        this.sendMessage(msg)
        
        context.api.devices.sendCommands(context.config.minerSwitches, 'switch', off)
    
        console.log("waiting for $coolOff minutes before restoring power.")
        let waitSeconds = 60 * coolOff
        this.runIn(waitSeconds, restorePower)
        }
        }
        

	})
