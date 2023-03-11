
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the following devices:', section => {
            section.deviceSetting('battery').capability(['battery']).name('Which Devices?');

        });


        page.section('Notification method', section => {
            section.booleanSetting('pushNotification').name('Push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.battery, 'battery', 'battery', 'lowBatteryHandler')

    })

    .subscribedEventHandler('lowBatteryHandler', (context, event) => {
        
        let val = event.value.toInteger()
        let device = event.device
        if (!state."warningHistory-${device.id}") {
        state."warningHistory-${device.id}" = []
        }
        if (val > 30) {
        state."warningHistory-${device.id}" = []
        } else {
        if (val <= 15 && val > 5) {
        this.sendLowBatteryWarning(device, '15%', val)
        } else {
        if (val <= 5) {
        this.sendLowBatteryWarning(device, '5%', val)
        }
        }
        }
        

	})
