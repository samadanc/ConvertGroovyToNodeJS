
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door closes...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Lock the lock...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("${event.value}")
        if (event.value == 'closed') {
        
        context.api.devices.sendCommands(context.config.lock1, 'lock', lock)
    
        console.log('door locked')
        }
        

	})
