
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('energymeters').capability(['energyMeter']).name('Energy Meter');

        });


        page.section('SEG API ID...', section => {
            section.textSetting('channelId').name('API ID');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.energymeters, 'energyMeter', 'power', 'appTouch')

    })

    .subscribedEventHandler('appTouch', (context, event) => {
        
        console.log("appTouch: $evt")
        this.checkSensors()
        

	})
