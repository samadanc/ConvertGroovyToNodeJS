
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When This switch is off', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn this switch on', section => {
            section.deviceSetting('switcheson').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.off', 'apphandler')

    })

    .subscribedEventHandler('apphandler', (context, event) => {
        
        console.log("appTouch: $evt")
        switcheson?.on()
        

	})
