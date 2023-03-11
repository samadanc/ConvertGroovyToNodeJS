
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which AEON power strip is used?', section => {
            section.deviceSetting('strip').capability(['switch']).name('');

        });


        page.section('Select a Virtual Switch to bind to Outlet 1', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Select a Virtual Switch to bind to Outlet 2', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


        page.section('Select a Virtual Switch to bind to Outlet 3', section => {
            section.deviceSetting('switch3').capability(['switch']).name('');

        });


        page.section('Select a Virtual Switch to bind to Outlet 4', section => {
            section.deviceSetting('switch4').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnOneHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'switchOnTwoHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.off', 'switchOffThreeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.off', 'switchOffFourHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch3, 'switch', 'switch.on', 'switchOnThreeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'switchOffTwoHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch4, 'switch', 'switch.on', 'switchOnFourHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffOneHandler')

    })

    .subscribedEventHandler('switchOffFourHandler', (context, event) => {
        
        console.log('switch off4')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', off4)
    
        

	})

    .subscribedEventHandler('switchOnOneHandler', (context, event) => {
        
        console.log('switch on1')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', on1)
    
        

	})

    .subscribedEventHandler('switchOffThreeHandler', (context, event) => {
        
        console.log('switch off3')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', off3)
    
        

	})

    .subscribedEventHandler('switchOffTwoHandler', (context, event) => {
        
        console.log('switch off2')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', off2)
    
        

	})

    .subscribedEventHandler('switchOnFourHandler', (context, event) => {
        
        console.log('switch on4')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', on4)
    
        

	})

    .subscribedEventHandler('switchOnThreeHandler', (context, event) => {
        
        console.log('switch on3')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', on3)
    
        

	})

    .subscribedEventHandler('switchOffOneHandler', (context, event) => {
        
        console.log('switch off1')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', off1)
    
        

	})

    .subscribedEventHandler('switchOnTwoHandler', (context, event) => {
        
        console.log('switch on2')
        
        context.api.devices.sendCommands(context.config.strip, 'switch', on2)
    
        

	})
