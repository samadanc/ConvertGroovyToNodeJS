
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Version 1.0 4/15/2018'', section => {

        });


        page.section('Select Outlets', section => {
            section.deviceSetting('powerMeters').capability(['powerMeter']).name('Outlers');
            section.numberSetting('belowThreshold').name('Low Threshold');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPush').name('Push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.powerMeters, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        console.log(event.value)
        let meterValue = (event.value as double)
        if (!atomicState.lastValue) {
        atomicState.lastValue = meterValue
        }
        let lastValue = (atomicState.lastValue as double)
        atomicState.lastValue = meterValue
        let dUnit = event.unit ? event.unit : 'Watts'
        let belowThresholdValue = (belowThreshold as int)
        if (meterValue < belowThresholdValue ) {
        if (lastValue > belowThresholdValue ) {
        let msg = "$meter reported ${event.value} $dUnit which is below your threshold of $belowThreshold."
        this.sendMessage(msg)
        } else {
        }
        }
        

	})
