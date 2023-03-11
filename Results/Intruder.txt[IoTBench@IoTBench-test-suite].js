
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these open...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Sensors?');

        });


        page.section('And the current mode is...', section => {

        });


        page.section('Turn this on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Switch?');

        });


        page.section('And Notify...', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        if (location.mode == currentMode ) {
        if (switch1) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        console.log('A contact was opened, notifying user and turning on switch')
        let message = "A contact was unexpectedly opened at ${event.date}!"
        this.send(message)
        } else {
        console.log('A contact was opened but the mode is not currect to trigger an action')
        }
        

	})
