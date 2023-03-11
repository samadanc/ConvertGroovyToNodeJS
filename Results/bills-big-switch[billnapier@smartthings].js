
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on or off', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        switches?.on()
        switches?.setLevel(100)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        switches?.off()
        

	})
