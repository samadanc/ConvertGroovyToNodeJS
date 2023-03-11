
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('aboveThreshold').name('Reports Above...');
            section.numberSetting('belowThreshold').name('Or Reports Below...');

        });


        page.section('', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');

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
        let dUnit = event.unit ? event.unit : 'Watts'
        let aboveThresholdValue = (aboveThreshold as int)
        if (meterValue > aboveThresholdValue ) {
        if (lastValue < aboveThresholdValue ) {
        let msg = "$meter reported ${event.value} $dUnit which is above your threshold of $aboveThreshold."
        this.sendMessage(msg)
        } else {
        }
        }
        let belowThresholdValue = (belowThreshold as int)
        if (meterValue < belowThresholdValue ) {
        if (lastValue > belowThresholdValue ) {
        let msg = "$meter reported ${event.value} $dUnit which is below your threshold of $belowThreshold."
        this.sendMessage(msg)
        } else {
        }
        }
        

	})
