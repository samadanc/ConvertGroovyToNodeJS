
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Outlet...');
            section.textSetting('belowThreshold').name('Energy Consumption Falls Below');

        });


        page.section('', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');

        });


        page.section('', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Turn Off This Power Outlet...');

        });


        page.section('Enabled/Disabled', section => {
            section.booleanSetting('enabled').name('Enabled?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        if (!atomicState.lastValue) {
        atomicState.lastValue = meterValue
        }
        let lastValue = (atomicState.lastValue as double)
        atomicState.lastValue = meterValue
        let belowThresholdValue = (belowThreshold as double)
        if (meterValue < belowThresholdValue ) {
        if (lastValue > belowThresholdValue ) {
        let msg = "Smart Charger: $meter reported ${event.value} W which is below your threshold of $belowThreshold W. Turning off in 1 mins."
        this.sendMessage(msg)
        this.runIn(1 * 60, scheduledHandler)
        } else {
        }
        } else {
        console.log("$meter - charging in progress ($meterValue W). Cancelling turn off scheduler (if any).")
        this.unschedule(scheduledHandler)
        }
        

	})
