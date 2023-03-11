
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When device is unresponsive', section => {
            section.deviceSetting('devices').capability(['polling']).name('Pollable device');

        });


        page.section('Send sms (leave blank for push)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.devices, 'polling', 'responsive', 'responsiveHandler')

    })

    .subscribedEventHandler('responsiveHandler', (context, event) => {
        
        console.log("responsiveHandler: $evt")
        this.updateResponsiveStatus()
        

	})
