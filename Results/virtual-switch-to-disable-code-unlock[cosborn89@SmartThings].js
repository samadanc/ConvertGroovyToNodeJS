
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is toggled...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Toggle Code Unlock on this lock...', section => {
            section.deviceSetting('theLock').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.theLock, 'lock', disableCodeunlock)
    
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.theLock, 'lock', enableCodeunlock)
    
        

	})
