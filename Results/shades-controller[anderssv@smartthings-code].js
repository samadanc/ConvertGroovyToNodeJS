
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control Close Buttons...', section => {
            section.deviceSetting('switchesOpen').capability(['button']).name('Open Buttons');
            section.deviceSetting('switchesClose').capability(['button']).name('Close Buttons');
            section.deviceSetting('shades').capability(['windowShade']).name('Shades');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switchesClose, 'button', 'button', 'buttonEventClose')

        await context.api.subscriptions.subscribeToDevices(context.config.switchesOpen, 'button', 'button', 'buttonEventOpen')

    })

    .subscribedEventHandler('buttonEventOpen', (context, event) => {
        
        console.log("Opening shades: $evt")
        if (event.value == 'pushed') {
        
        context.api.devices.sendCommands(context.config.shades, 'windowShade', close)
    
        }
        

	})

    .subscribedEventHandler('buttonEventPause', (context, event) => {
        
        console.log("Pausing Shades: $evt")
        
        context.api.devices.sendCommands(context.config.shades, 'windowShade', pause)
    
        

	})

    .subscribedEventHandler('buttonEventClose', (context, event) => {
        
        console.log("Closing Shades: $evt")
        if (event.value == 'pushed') {
        
        context.api.devices.sendCommands(context.config.shades, 'windowShade', open)
    
        }
        

	})
