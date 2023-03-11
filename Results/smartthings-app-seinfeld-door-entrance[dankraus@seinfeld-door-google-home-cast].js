
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('NodeJS app', section => {
            section.textSetting('nodeAppBaseAddress').name('NodeJS app available at (https://123abc.ngrok.io)');
            section.textSetting('googleHomeIP').name('IP Address of Google Home');

        });


        page.section('Sensor', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        log.info("Door Open Handler: $evt")
        state.isEntering = !state.isEntering
        if (state.isEntering) {
        try {
        let url = "$nodeAppBaseAddress/door"
        let postParams = "ip=$googleHomeIP"
        this.httpPost(['uri': url , 'body': ['ip': googleHomeIP ]], { let response ->
        console.log("Played Seinfeld riff. Response data: ${resp.data}")
        })
        }
        catch (let e) {
        console.log("Call to NodeJS app failed: $e")
        }
        }
        

	})
