
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this/these contact(s) close...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('');

        });


        page.section('Return this light to the color at contact open...', section => {
            section.deviceSetting('bulb').capability(['colorControl']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.closed', 'contactClosedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact.closed', 'contactclosedHandler')

    })

    .subscribedEventHandler('contactclosedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.bulb, 'colorControl', setColor)
    
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let values = [:]
        values = ['level': 
        atomicState.previousValues = values
        log.info("Previous values are: ${atomicState.previousValues}")
        

	})
