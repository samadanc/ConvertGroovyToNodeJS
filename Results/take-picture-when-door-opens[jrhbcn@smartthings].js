
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences:', section => {
            section.deviceSetting('thedoor').capability(['contactSensor']).name('Door?');
            section.deviceSetting('thecamera').capability(['imageCapture']).name('Camera?');
            section.numberSetting('burstCount').name('How many? (default 5)');
            section.booleanSetting('sendPush').name('Send Push Notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thedoor, 'contactSensor', 'contact.open', 'contactHandler')

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thecamera, 'imageCapture', take)
    
        (1..burstCount ? burstCount : 5 - 1).each({
        
        context.api.devices.sendCommands(context.config.thecamera, 'imageCapture', take)
    
        })
        if (sendPush) {
        this.sendPush('Door has been opened!')
        }
        

	})
