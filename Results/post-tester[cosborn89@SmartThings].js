
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor This Switch', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Which switch?');

        });


        page.section('Post to This URL', section => {
            section.textSetting('postCatcherID').name('postCatcher ID');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch', 'poster')

    })

    .subscribedEventHandler('poster', (context, event) => {
        
        let url = "http://postcatcher.in/catchers/$postCatcherID"
        let params = ['uri': url , 'body': ['home': ['homeId': 'c2350d41', 'extraData': 'SmartThings']]]
        try {
        this.httpPostJson(params, { let resp ->
        resp.headers.each({
        console.log("Header ${it.name} : ${it.value}")
        })
        console.log("response contentType: ${resp.contentType}")
        })
        }
        catch (let e) {
        console.log("something went wrong: $e")
        }
        

	})
