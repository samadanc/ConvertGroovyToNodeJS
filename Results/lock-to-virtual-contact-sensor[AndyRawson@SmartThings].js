
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this lock is locked or unlocked', section => {
            section.deviceSetting('master').capability(['lock']).name('Where?');

        });


        page.section('open or close this contact switch', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'lock', 'lock.locked', 'lockedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'lock', 'lock.unlocked', 'unlockedHandler')

    })

    .subscribedEventHandler('unlockedHandler', (context, event) => {
        
        console.log(event.value)
        
        context.api.devices.sendCommands(context.config.contacts, 'contactSensor', open)
    
        

	})

    .subscribedEventHandler('lockedHandler', (context, event) => {
        
        console.log(event.value)
        
        context.api.devices.sendCommands(context.config.contacts, 'contactSensor', close)
    
        

	})
