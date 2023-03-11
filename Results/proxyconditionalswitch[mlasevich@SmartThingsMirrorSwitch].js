
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Real Switch...', section => {
            section.deviceSetting('realswitch').capability(['switch']).name('Actual Switch To Control...');

        });


        page.section('Virtual Confitional Switch', section => {
            section.deviceSetting('standin').capability(['switch']).name('Virtual Confitional Switch...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.standin, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.standin, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log('switchOffCondHandler: wasOff=' + state.wasOff)
        if (state.wasOff) {
        
        context.api.devices.sendCommands(context.config.realswitch, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('Realswitch is: ' + realswitch.displayName)
        state.wasOff = realswitch.currentValue
        console.log('switchOnCondHandler: wasOff=' + state.wasOff)
        if (state.wasOff) {
        
        context.api.devices.sendCommands(context.config.realswitch, 'switch', on)
    
        }
        

	})
