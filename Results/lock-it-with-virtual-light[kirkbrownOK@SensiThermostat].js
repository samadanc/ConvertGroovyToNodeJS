
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Match with this Virtual Light', section => {
            section.deviceSetting('light1').capability(['switch']).name('Which Virtual Light?');
            section.enumSetting('lockedOn').name('Should the lock be locked when the light is ON or OFF?');

        });


        page.section('Lock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');
            section.enumSetting('unlock').name('Allow the Tile to unlock the door?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.unlocked', 'doorUnlocked')

        await context.api.subscriptions.subscribeToDevices(context.config.light1, 'switch', 'switch.on', 'lightOn')

        await context.api.subscriptions.subscribeToDevices(context.config.light1, 'switch', 'switch.off', 'lightOff')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.locked', 'doorLocked')

    })

    .subscribedEventHandler('lightOff', (context, event) => {
        
        log.info("${event.name} ${event.value} ${event.descriptionText}")
        if (descriptionText == 'Virtual') {
        this.TRACE('Virtual Light OFF')
        return null
        }
        if (lockedOn == 'ON') {
        if (unlock == 'YES') {
        this.TRACE('LOFF UNLOCK')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        }
        } else {
        this.TRACE('LOFF LOCK')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        }
        

	})

    .subscribedEventHandler('doorLocked', (context, event) => {
        
        log.info("${event.name} ${event.value} ${event.descriptionText}")
        if (lockedOn == 'ON') {
        
        context.api.devices.sendCommands(context.config.light1, 'switch', syncOn)
    
        } else {
        
        context.api.devices.sendCommands(context.config.light1, 'switch', syncOff)
    
        }
        

	})

    .subscribedEventHandler('lightOn', (context, event) => {
        
        log.info("${event.name} ${event.value} ${event.descriptionText}")
        if (descriptionText == 'Virtual') {
        this.TRACE('light ON Virtual')
        return null
        }
        if (lockedOn == 'ON') {
        this.TRACE('LON LOCKING')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        } else {
        if (unlock == 'YES') {
        this.TRACE('LON UNLOCKING')
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', unlock)
    
        }
        }
        

	})

    .subscribedEventHandler('doorUnlocked', (context, event) => {
        
        log.info("${event.name} ${event.value} ${event.descriptionText}")
        if (lockedOn == 'ON') {
        
        context.api.devices.sendCommands(context.config.light1, 'switch', syncOff)
    
        } else {
        
        context.api.devices.sendCommands(context.config.light1, 'switch', syncOn)
    
        }
        

	})
