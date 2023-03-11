
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this smokealarm rang...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('');

        });


        page.section('Unlock door ...', section => {
            section.deviceSetting('door').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarms, 'alarm', 'alarm.both', 'detectionhandler')

        await context.api.subscriptions.subscribeToDevices(context.config.alarms, 'alarm', 'alarm.siren', 'detectionhandler')

    })

    .subscribedEventHandler('detectionhandler', (context, event) => {
        
        console.log('smoke is detected')
        
        context.api.devices.sendCommands(context.config.door, 'lock', unlock)
    
        

	})
