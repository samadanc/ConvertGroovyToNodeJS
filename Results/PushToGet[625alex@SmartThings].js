
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this momentary button is pressed...', section => {
            section.deviceSetting('button').capability(['momentary']).name('Which button?');

        });


        page.section('Make a request to...', section => {
            section.textSetting('myURL').name('Which URL?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.button, 'momentary', 'momentary.pushed', 'pushHandler')

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
        console.log("making a GET request to $myURL")
        this.httpGet(myURL, { let response ->
        console.log("push to URL complete, response: ${response.data}")
        })
        

	})
