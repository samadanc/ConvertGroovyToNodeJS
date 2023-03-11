
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When this power meter...');
            section.numberSetting('belowThreshold').name('Reports below...');
            section.numberSetting('belowThresholdTimes').name('... Times');
            section.numberSetting('aboveThreshold').name('After being above...');

        });


        page.section('', section => {
            section.booleanSetting('pushNotification').name('Send a push notification');
            section.textSetting('notificationText').name('Notification text');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        console.log("Laundry notification meterValue $meterValue")
        let aboveThresholdValue = (aboveThreshold as int)
        let belowThresholdValue = (belowThreshold as int)
        let belowThresholdTimesValue = (belowThresholdTimes as int)
        if (atomicState.active) {
        console.log('device is already detected as active')
        } else {
        if (meterValue > aboveThresholdValue ) {
        atomicState.active = true
        console.log("device is detected as being active (above threshold $aboveThresholdValue)")
        } else {
        console.log('device is not in use')
        }
        }
        if (atomicState.active && meterValue < belowThresholdValue ) {
        atomicState.belowThresholdTimes += 1
        console.log("belowThresholdTimes is ${atomicState.belowThresholdTimes}")
        if (atomicState.belowThresholdTimes >= belowThresholdTimesValue ) {
        this.sendMessage(notificationText)
        atomicState.belowThresholdTimes = 0
        atomicState.active = false
        }
        } else {
        atomicState.belowThresholdTimes = 0
        }
        

	})
