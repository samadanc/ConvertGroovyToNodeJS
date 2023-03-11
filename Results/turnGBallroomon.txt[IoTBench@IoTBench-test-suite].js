
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on which A/C or fan...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('ct1').capability(['contactSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ct1, 'contactSensor', 'contact.open', 'ctopenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.ct1, 'contactSensor', 'contact.closed', 'ctclosedHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        

	})

    .subscribedEventHandler('ctopenHandler', (context, event) => {
        
        switch1?.on()
        

	})

    .subscribedEventHandler('ctclosedHandler', (context, event) => {
        
        switch1?.off()
        

	})
