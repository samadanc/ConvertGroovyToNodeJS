
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switches that you want to keep track of:', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (state.debug) {
        console.log("switch evt: $evt")
        console.log("state: $state")
        }
        if (state.loggeruri != null) {
        let params = ['uri': state.loggeruri, 'body': ['time': event.date.toString(), 'id': event.deviceId, 'state': event.value]]
        try {
        this.httpPostJson(params, { let resp ->
        resp.headers.each({
        console.log("${it.name} : ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        })
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        }
        

	})
