
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensors', section => {
            section.deviceSetting('energyMeter').capability(['energyMeter']).name('Which energy meter(s)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeter, 'energyMeter', 'power', 'energyMeterPowerHandler')

    })

    .subscribedEventHandler('energyMeterPowerHandler', (context, event) => {
        
        console.log("current value: ${event.value}")
        this.reportPowerValueToFirebase(event.value)
        

	})
