
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('ZWN-RSM2 Module:', section => {
            section.deviceSetting('rsm').capability(['switch']).name('Which RSM2 Module?');
            section.deviceSetting('switch1').capability(['switch']).name('First Switch?');
            section.deviceSetting('switch2').capability(['switch']).name('Second Switch?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch', 'rsmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch2', 'rsmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch1', 'rsmHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        switch (event.deviceId) {
        case switch1.id:
        switch (event.value) {
        case 'on':
        console.log('switch 1 on')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on1)
    
        break
        case 'off':
        console.log('switch 1 off')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off1)
    
        break
        }
        break
        case switch2.id:
        switch (event.value) {
        case 'on':
        console.log('switch 2 on')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on2)
    
        break
        case 'off':
        console.log('switch 2 off')
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off2)
    
        break
        }
        break
        default:
        pass
        }
        

	})

    .subscribedEventHandler('rsmHandler', (context, event) => {
        
        console.log("${event.name} ${event.value}")
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
