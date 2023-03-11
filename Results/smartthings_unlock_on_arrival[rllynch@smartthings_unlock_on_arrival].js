
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of these people come home:', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Unlock these doors:', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("${event.device}: ${event.value}")
        if (event.value == 'present') {
        console.log("Unlocking $locks")
        
        context.api.devices.sendCommands(context.config.locks, 'lock', unlock)
    
        }
        

	})
