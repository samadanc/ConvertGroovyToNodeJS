
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('ZL 7432US Module:', section => {
            section.deviceSetting('rsm').capability(['switch']).name('Which ZL 7432US Dual Relay Module?');
            section.deviceSetting('switch1').capability(['switch']).name('Switch to assign 1st Channel');
            section.deviceSetting('switch2').capability(['switch']).name('Switch to assign 2nd Channel');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnOneHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch2', 'rsmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'switchOnTwoHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch1', 'rsmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'switchOffTwoHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffOneHandler')

    })

    .subscribedEventHandler('switchOnOneHandler', (context, event) => {
        
        console.log('switch on')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', refresh)
    
        

	})

    .subscribedEventHandler('rsmHandler', (context, event) => {
        
        console.log("rsmHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} is: ${event.is()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        if (event.name == 'switch1') {
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        break
        }
        } else {
        if (event.name == 'switch2') {
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        break
        }
        }
        }
        

	})

    .subscribedEventHandler('switchOffTwoHandler', (context, event) => {
        
        console.log('switch off2')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off2)
    
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', refresh)
    
        

	})

    .subscribedEventHandler('switchOffOneHandler', (context, event) => {
        
        console.log('switch off')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', refresh)
    
        

	})

    .subscribedEventHandler('switchOnTwoHandler', (context, event) => {
        
        console.log('switch on2')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on2)
    
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', refresh)
    
        

	})
