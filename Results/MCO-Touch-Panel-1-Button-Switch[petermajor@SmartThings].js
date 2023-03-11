
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('1 Button Switch', section => {
            section.deviceSetting('master').capability(['zwMultichannel']).name('Switch?');

        });


        page.section('Controls this switch', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Button 1');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'zwMultichannel', 'switch.on', 'onMaster')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'zwMultichannel', 'switch.off', 'offMaster')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onSwitch')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offSwitch')

    })

    .subscribedEventHandler('onSwitch', (context, event) => {
        
        console.log("MCO-1-APP-onSwitch $evt")
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', on)
    
        

	})

    .subscribedEventHandler('onMaster', (context, event) => {
        
        console.log("MCO-1-APP-onMaster $evt")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        

	})

    .subscribedEventHandler('offMaster', (context, event) => {
        
        console.log("MCO-1-APP-offMaster $evt")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})

    .subscribedEventHandler('offSwitch', (context, event) => {
        
        console.log("MCO-1-APP-offSwitch $evt")
        
        context.api.devices.sendCommands(context.config.master, 'zwMultichannel', off)
    
        

	})
