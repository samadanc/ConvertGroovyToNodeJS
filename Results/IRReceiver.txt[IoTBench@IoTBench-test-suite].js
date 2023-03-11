
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

        await context.api.subscriptions.subscribeToDevices(context.config.id, 'device.IrBlaster', 'button.B', 'handleB')

        await context.api.subscriptions.subscribeToDevices(context.config.id, 'device.IrBlaster', 'button.A', 'handleA')

    })

    .subscribedEventHandler('handleB', (context, event) => {
        
        console.log('received button B')
        if 
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('handleA', (context, event) => {
        
        console.log('received button A')
        if
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        

	})
