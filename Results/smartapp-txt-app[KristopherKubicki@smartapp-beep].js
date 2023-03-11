
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Virtual Switch', section => {
            section.deviceSetting('dswitch').capability(['switch']).name('Which?');

        });


        page.section('Send a text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dswitch, 'switch', 'switch.on', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.source == 'APP_COMMAND') {
        console.log("${event.source} is the source: ${event.description} : ${event.displayName}")
        this.sendSms(phone, "${event.displayName}")
        }
        

	})
