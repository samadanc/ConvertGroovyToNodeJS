
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pick an IR device...', section => {

        });


        page.section('Button A turns on or off...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('This light');

        });


        page.section('Button B turns on or off...', section => {
            section.deviceSetting('switch2').capability(['switch']).name('This light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.irDevice, 'device.myirbridge', 'button.A', 'handleA')

        await context.api.subscriptions.subscribeToDevices(context.config.irDevice, 'device.myirbridge', 'button.B', 'handleB')

    })

    .subscribedEventHandler('handleB', (context, event) => {
        
        console.log('received button B')
        if 
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.irDevice, 'device.myirbridge', Boff)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.irDevice, 'device.myirbridge', Bon)
    
        }
        

	})

    .subscribedEventHandler('handleA', (context, event) => {
        
        console.log('received button A')
        if
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.irDevice, 'device.myirbridge', off)
    
        console.log('SmartApps Aoff')
        } else {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.irDevice, 'device.myirbridge', on)
    
        console.log('SmartApps Aon')
        }
        

	})
