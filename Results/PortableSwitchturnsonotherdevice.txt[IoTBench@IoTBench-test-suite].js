
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this portable switch is turned on...', section => {
            section.deviceSetting('master').capability(['switch']).name('Which?');

        });


        page.section('This outlet or switch is turned on...', section => {
            section.deviceSetting('slave').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'masterOn')

    })

    .subscribedEventHandler('masterOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.slave, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.master, 'switch', off)
    
        

	})
