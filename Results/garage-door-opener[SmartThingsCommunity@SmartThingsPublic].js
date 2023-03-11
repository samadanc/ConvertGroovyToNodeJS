
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door switch is turned on, open the garage door...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'on', 'onCommand')

    })

    .subscribedEventHandler('onCommand', (context, event) => {
        
        console.log("onCommand: ${event.value}, $evt")
        switch1?.off(['delay': 3000])
        

	})
