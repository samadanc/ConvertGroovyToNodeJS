
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('Turn on a switch for 5 minutes...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})
