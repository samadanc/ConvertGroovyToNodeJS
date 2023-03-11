
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these doors are both closed, or at least one is open...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');
            section.deviceSetting('contact2').capability(['contactSensor']).name('');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact2, 'contactSensor', 'contact', 'contactHandler2')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'timeoutHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler1')

    })

    .subscribedEventHandler('timeoutHandler', (context, event) => {
        
        this.runIn(60 * 10, switchHandler)
        

	})

    .subscribedEventHandler('contactHandler2', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if (event.value == 'closed') {
        if
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        }
        

	})

    .subscribedEventHandler('contactHandler1', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if (event.value == 'closed') {
        if
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        }
        

	})
