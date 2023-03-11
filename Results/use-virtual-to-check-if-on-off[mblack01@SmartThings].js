
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Real Switch...', section => {
            section.deviceSetting('realswitch').capability(['switch']).name('Real Switch...');

        });


        page.section('Virtual Stand-in...', section => {
            section.deviceSetting('standin').capability(['switch']).name('Stand In Virtual Switch...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.standin, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.standin, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        if (state.wasOff) {
        
        context.api.devices.sendCommands(context.config.realswitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        state.wasOff = realswitch.currentValue
        if (state.wasOff) {
        
        context.api.devices.sendCommands(context.config.realswitch, 'switch', on)
    
        }
        

	})
