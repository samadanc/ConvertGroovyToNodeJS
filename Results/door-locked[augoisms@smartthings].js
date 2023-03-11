
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select door', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('');

        });


        page.section('Select lights to turn on/off...', section => {
            section.deviceSetting('bulbs').capability(['light']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact.closed', 'onLocked')

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'contactSensor', 'contact.open', 'onUnlocked')

        context.api.schedules.runEvery3Hours('checkStatus', delay);

    })

    .subscribedEventHandler('onUnlocked', (context, event) => {
        
        console.log('door is unlocked, turning lights on')
        
        context.api.devices.sendCommands(context.config.bulbs, 'light', on)
    
        

	})

    .subscribedEventHandler('onLocked', (context, event) => {
        
        console.log('door is locked, turning lights off')
        
        context.api.devices.sendCommands(context.config.bulbs, 'light', off)
    
        

	})

    .scheduledEventHandler('checkStatus', (context, event) => {
        
        if
        console.log('door is locked, turning lights off')
        
        context.api.devices.sendCommands(context.config.bulbs, 'light', off)
    
        } else {
        console.log('door is unlocked, turning lights on')
        
        context.api.devices.sendCommands(context.config.bulbs, 'light', on)
    
        }
        

	})
