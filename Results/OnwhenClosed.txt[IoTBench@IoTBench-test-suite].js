
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the bathroom door opens/closes...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Toggle the extractor...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.value}: $evt")
        if (event.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (event.value == 'open') {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        

	})
