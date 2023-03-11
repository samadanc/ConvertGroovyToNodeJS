
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a sensor', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Power Meter');

        });


        page.section('Configure your Numerous App Settings', section => {
            section.textSetting('API_Key').name('API Key');
            section.textSetting('Metric_ID').name('Metric ID');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'updateCurrentValue')

    })

    .subscribedEventHandler('updateCurrentValue', (context, event) => {
        
        console.log("Updating Numerous Value: $meter to ${event.value}")
        let params = ['uri': 'https://' + API_Key + '@api.numerousapp.com', 'path': '/v2/metrics/' + Metric_ID + '/events', 'body': ['value': event.value]]
        try {
        this.httpPostJson(params, { let resp ->
        console.log("response data: ${resp.data}")
        console.log("response contentType: ${resp.contentType}")
        })
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})
