
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select an Arduino board', section => {

        });


        page.section('Hallway Triggering Device', section => {
            section.deviceSetting('hallway').capability(['switch']).name('');

        });


        page.section('Sidewalk Triggering Device', section => {
            section.deviceSetting('sidewalk').capability(['switch']).name('');

        });


        page.section('Yard Light Triggering Device', section => {
            section.deviceSetting('yard').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.yard, 'switch', 'switch.on', 'yardOn')

        await context.api.subscriptions.subscribeToDevices(context.config.hallway, 'switch', 'switch.on', 'hallOn')

        await context.api.subscriptions.subscribeToDevices(context.config.yard, 'switch', 'switch.off', 'yardOff')

        await context.api.subscriptions.subscribeToDevices(context.config.sidewalk, 'switch', 'switch.off', 'sidewalkOff')

        await context.api.subscriptions.subscribeToDevices(context.config.sidewalk, 'switch', 'switch.on', 'sidewalkOn')

        await context.api.subscriptions.subscribeToDevices(context.config.hallway, 'switch', 'switch.off', 'hallOff')

    })

    .subscribedEventHandler('hallOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOff1)
    
        

	})

    .subscribedEventHandler('sidewalkOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOn6)
    
        

	})

    .subscribedEventHandler('yardOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOn4)
    
        

	})

    .subscribedEventHandler('hallOn', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOn2)
    
        

	})

    .subscribedEventHandler('sidewalkOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOff5)
    
        

	})

    .subscribedEventHandler('yardOff', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.arduino, 'device.arduinoRelayBoard', RelayOff3)
    
        

	})
