
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Smoke Alarm for reference', section => {
            section.deviceSetting('smokealarm').capability(['alarm']).name('');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('switchon').capability(['switch']).name('');

        });


        page.section('When this light is off', section => {
            section.deviceSetting('switchoff').capability(['switch']).name('');

        });


        page.section('Addin this door for reference', section => {
            section.deviceSetting('Door').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchoff, 'switch', 'switch.off', 'appHandler')

    })

    .subscribedEventHandler('appHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switchon, 'switch', on)
    
        

	})
