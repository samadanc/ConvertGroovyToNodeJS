
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this gets turned off...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off...', section => {
            section.deviceSetting('switchesoff').capability(['switch']).name('');

        });


        page.section('When I touch the app, be active after...', section => {
            section.numberSetting('timer').name('seconds?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.off', 'offhandler')

    })

    .subscribedEventHandler('offhandler', (context, event) => {
        
        console.log("$switches")
        monitor?.execute("AppName: Big Turn ON, ($switches switch : on)")
        location.setMode('Away')
        switchesoff?.off()
        

	})
