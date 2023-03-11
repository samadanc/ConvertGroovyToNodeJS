
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Lock this lock', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.unlocked', 'unlockedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.locked', 'lockedHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Locking lock: $lock1")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        

	})

    .subscribedEventHandler('lockedHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning on switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})

    .subscribedEventHandler('unlockedHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning off switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Unlocking lock: $lock1")
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        

	})
