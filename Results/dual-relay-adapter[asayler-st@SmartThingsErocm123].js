
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configuration:', section => {
            section.deviceSetting('rsm').capability(['switch']).name('Which Dual Relay Module?');
            section.deviceSetting('switch1').capability(['switch']).name('Virtual Switch to link to Switch 1?');
            section.deviceSetting('switch2').capability(['switch']).name('Virtual Switch to link to Switch 2?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'on', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch2', 'rsmHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'off', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'on', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'off', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.rsm, 'switch', 'switch1', 'rsmHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switchHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        switch (event.deviceId) {
        case switch1.id:
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on1)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off1)
    
        break
        }
        break
        case switch2.id:
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', on2)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.rsm, 'switch', off2)
    
        break
        }
        break
        default:
        pass
        }
        

	})

    .subscribedEventHandler('rsmHandler', (context, event) => {
        
        console.log("rsmHandler called with event:  name:${event.name} source:${event.source} value:${event.value} isStateChange: ${event.isStateChange()} isPhysical: ${event.isPhysical()} isDigital: ${event.isDigital()} data: ${event.data} device: ${event.device}")
        if (event.name == 'switch1') {
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', onPhysical)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', offPhysical)
    
        break
        }
        } else {
        if (event.name == 'switch2') {
        switch (event.value) {
        case 'on':
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', onPhysical)
    
        break
        case 'off':
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', offPhysical)
    
        break
        }
        }
        }
        

	})
