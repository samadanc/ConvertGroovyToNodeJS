
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('firstDoor').capability(['contactSensor']).name('pick a contact sensor');
            section.deviceSetting('secondDoor').capability(['contactSensor']).name('pick a contact sensor');
            section.deviceSetting('light').capability(['switch']).name('pick a light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.firstDoor, 'contactSensor', 'contact', 'firstDoorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.secondDoor, 'contactSensor', 'contact', 'secondDoorHandler')

    })

    .subscribedEventHandler('secondDoorHandler', (context, event) => {
        
        if
        console.log('First contact or second contact is open. Turning on light.')
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        } else {
        console.log('Both contacts are closed. Turning off light')
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('firstDoorHandler', (context, event) => {
        
        if
        console.log('First contact or second contact is open. Turning on light.')
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        } else {
        console.log('Both contacts are closed. Turning off light')
        
        context.api.devices.sendCommands(context.config.light, 'switch', off)
    
        }
        

	})
