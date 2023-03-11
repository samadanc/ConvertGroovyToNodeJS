
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is on...', section => {
            section.deviceSetting('switchon').capability(['switch']).name('');

        });


        page.section('Turn this switch off...', section => {
            section.deviceSetting('switchoff').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchon, 'switch', 'switch.on', 'appHandler')

    })

    .subscribedEventHandler('appHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switchoff, 'switch', off)
    
        

	})
