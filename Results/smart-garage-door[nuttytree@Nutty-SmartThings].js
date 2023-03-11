
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.deviceSetting('door').capability(['garageDoorControl']).name('Garage Door?');
            section.deviceSetting('vehicle').capability(['presenceSensor']).name('Who?');
            section.booleanSetting('onArrival').name('Open on arrival?');
            section.booleanSetting('onDeparture').name('Close on departure?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.vehicle, 'presenceSensor', 'presence.present', 'openDoor')

        await context.api.subscriptions.subscribeToDevices(context.config.vehicle, 'presenceSensor', 'presence.not present', 'closeDoor')

    })

    .subscribedEventHandler('openDoor', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.door, 'garageDoorControl', open)
    
        

	})

    .subscribedEventHandler('closeDoor', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.door, 'garageDoorControl', close)
    
        

	})
