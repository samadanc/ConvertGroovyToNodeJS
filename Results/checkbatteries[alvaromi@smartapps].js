
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('batteryPoweredDevices').capability(['battery']).name('Battery-powered devices to monitor');
            section.numberSetting('minLevelCritical').name('Notify critical level (%)');
            section.numberSetting('minLevelWarning').name('Notify warning level (%)');
            section.numberSetting('phoneNumber').name('Notify phone number (optional)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkCriticalBatteryLevels', delay);

        context.api.schedules.schedule('checkWarningBatteryLevels', delay);

    })

    .scheduledEventHandler('checkCriticalBatteryLevels', (context, event) => {
        
        let criticalLevelDevices = batteryPoweredDevices.findAll({
        it.currentBattery <= minLevelCritical
        }).sort({
        it.currentBattery
        })
        this.sendMessage(criticalLevelDevices, 'CRITICAL')
        

	})

    .scheduledEventHandler('checkWarningBatteryLevels', (context, event) => {
        
        let warningLevelDevices = batteryPoweredDevices.findAll({
        it.currentBattery <= minLevelWarning && it.currentBattery > minLevelCritical
        }).sort({
        it.currentBattery
        })
        this.sendMessage(warningLevelDevices, 'WARNING')
        

	})
