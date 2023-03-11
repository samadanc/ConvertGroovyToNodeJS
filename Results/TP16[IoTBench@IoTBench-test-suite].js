
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this switch...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('to control this garage door...', section => {
            section.deviceSetting('theOpener').capability(['momentary']).name('');

        });


        page.section('whose status is given by this sensor...', section => {
            section.deviceSetting('theSensor').capability(['threeAxis']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch', 'switchHit')

        await context.api.subscriptions.subscribeToDevices(context.config.theSensor, 'threeAxis', 'status', 'statusChanged')

    })

    .subscribedEventHandler('statusChanged', (context, event) => {
        
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        } else {
        if (event.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('switchHit', (context, event) => {
        
        console.log('in switchHit: ' + event.value)
        
        context.api.devices.sendCommands(context.config.theSensor, 'threeAxis', currentState)
    
        if (event.value == 'on') {
        if (current.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.theOpener, 'momentary', push)
    
        }
        } else {
        if (current.value == 'open') {
        
        context.api.devices.sendCommands(context.config.theOpener, 'momentary', push)
    
        }
        }
        

	})
