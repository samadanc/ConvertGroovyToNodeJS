
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Outlet...');
            section.numberSetting('executeTime').name('Time (in min) before turning off power outlet:');
            section.numberSetting('belowThreshold').name('Energy Consumption Falls Below');

        });


        page.section('', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');

        });


        page.section('', section => {
            section.deviceSetting('outlet').capability(['switch']).name('Turn Off This Power Outlet...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        console.log("DS - meterValue: $meterValue")
        if (!state.lastValue) {
        state.lastValue = meterValue
        }
        state.lastValue = meterValue
        let belowThresholdValue = (belowThreshold as double)
        let executeTimeValue = (executeTime as int)
        if (meterValue < belowThresholdValue ) {
        let msg = "$meter reported ${event.value} W which is below your threshold of $belowThreshold W"
        console.log("DS - $msg")
        if (meterValue != 0.0) {
        console.log("DS - set a $executeTimeValue min scheduler to power off the $meter")
        this.runIn(executeTimeValue * 60, scheduledHandler)
        }
        } else {
        console.log("DS - Power not below threshold / $meter turned on. Cancelling schedule (if any).")
        this.unschedule(scheduledHandler)
        }
        

	})
