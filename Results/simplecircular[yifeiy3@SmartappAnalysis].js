
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off this switch', section => {
            section.deviceSetting('switchesoff').capability(['switch']).name('');

        });


        page.section('When this switch is off', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Switch for reference', section => {
            section.deviceSetting('switchesref').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.off', 'apphandler')

    })

    .subscribedEventHandler('apphandler', (context, event) => {
        
        switchesoff?.off()
        

	})
