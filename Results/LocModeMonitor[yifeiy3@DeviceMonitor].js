
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the mode for location changes, notify...', section => {
            section.deviceSetting('Monitor').capability(['execute']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("Location mode is changed to ${location.currentMode}")
        
        context.api.devices.sendCommands(context.config.Monitor, 'execute', execute)
    
        

	})
