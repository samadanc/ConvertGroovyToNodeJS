
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When battery drops below', section => {
            section.deviceSetting('devices').capability(['battery']).name('Battery Operated Devices');

        });


        page.section('Battery level', section => {
            section.numberSetting('level').name('Battery Level');

        });


        page.section('Send sms (leave blank for push)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'battery', 'battery', 'batteryHandler')

    })

    .subscribedEventHandler('batteryHandler', (context, event) => {
        
        console.log("batteryHandler: $evt")
        this.updateBatteryStatus()
        

	})
