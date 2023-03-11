
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is off...', section => {
            section.deviceSetting('switchoff').capability(['switch']).name('');

        });


        page.section('Turn this switch on...', section => {
            section.deviceSetting('switchon').capability(['switch']).name('');

        });


        page.section('Put this switch for reference...', section => {
            section.deviceSetting('switchref').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchoff, 'switch', 'switch.off', 'apphandler')

    })

    .subscribedEventHandler('apphandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switchon, 'switch', on)
    
        

	})
