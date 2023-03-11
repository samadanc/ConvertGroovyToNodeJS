
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn off a light', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'open') {
        state.wasOn = switch1.currentValue
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        if (event.value == 'closed') {
        if (state.wasOn) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        

	})
