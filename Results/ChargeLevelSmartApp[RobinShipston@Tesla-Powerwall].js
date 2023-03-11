
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('battery').capability(['battery']).name('When This Battery...');
            section.numberSetting('aboveThreshold').name('Reports Above...');
            section.numberSetting('belowThreshold').name('Or Reports Below...');

        });


        page.section('', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'batteryHandler')

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        let batteryValue = (event.value as double)
        console.log("BatteryValue = $batteryValue")
        if (!atomicState.lastValue) {
        atomicState.lastValue = batteryValue
        }
        let lastValue = (atomicState.lastValue as double)
        atomicState.lastValue = batteryValue
        let dUnit = event.unit ? event.unit : '%'
        let aboveThresholdValue = (aboveThreshold as int)
        if (batteryValue > aboveThresholdValue ) {
        if (lastValue < aboveThresholdValue ) {
        let msg = "$battery has risen to ${Math.round(batteryValue)} $dUnit charge."
        this.sendMessage(msg)
        } else {
        }
        }
        let belowThresholdValue = (belowThreshold as int)
        if (batteryValue < belowThresholdValue ) {
        if (lastValue > belowThresholdValue ) {
        let msg = "$battery has fallen to ${Math.round(batteryValue)} $dUnit charge."
        this.sendMessage(msg)
        } else {
        }
        }
        

	})
