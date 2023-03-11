
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose switch to monitor... ', section => {
            section.deviceSetting('myswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'greeting', 'greetings')

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch.on', 'handler')

        await context.api.subscriptions.subscribeToDevices(context.config.myswitch, 'switch', 'switch.off', 'handler')

    })

    .subscribedEventHandler('greetings', (context, event) => {
        
        console.log("warning app: ${event.name}, ${event.value}, $settings")
        if (event.value == 'mail') {
        console.log('mailbox opened!')
        this.sendPush('mailbox opened!')
        }
        if (event.value == 'ping') {
        console.log('doing nuttin')
        }
        

	})

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("warning app: ${event.name}, ${event.value}, $settings")
        

	})
