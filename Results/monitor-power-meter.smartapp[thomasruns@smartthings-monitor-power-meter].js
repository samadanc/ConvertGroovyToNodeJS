
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('threshold').name('Reports Watts Below...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        if (meterValue < thresholdValue ) {
        this.sendPush("$meter lost power! Power read: [$meterValue]")
        }
        

	})
