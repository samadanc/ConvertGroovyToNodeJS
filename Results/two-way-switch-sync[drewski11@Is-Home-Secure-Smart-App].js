
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch 1', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Switch 2', section => {
            section.deviceSetting('switch2').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler1')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.off', 'offHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.switch2, 'switch', 'switch.on', 'onHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler1')

    })

    .subscribedEventHandler('offHandler1', (context, event) => {
        
        if
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('onHandler1', (context, event) => {
        
        if
        
        context.api.devices.sendCommands(context.config.switch2, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('onHandler2', (context, event) => {
        
        if 
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('offHandler2', (context, event) => {
        
        if 
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        

	})
