
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When battery change in these devices', section => {
            section.deviceSetting('devices').capability(['battery']).name('Battery Operated Devices');

        });


        page.section('Drops below this level', section => {
            section.numberSetting('level').name('Battery Level (%)');

        });


        page.section('Notify', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'battery', 'battery', 'batteryHandler')

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        this.updateBatteryStatus()
        

	})
