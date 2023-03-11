
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens or closes ...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on a light ...', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.closed', 'contactCloseHandler')

    })

    .subscribedEventHandler('contactCloseHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        if (phone1) {
        console.log("$contact1 was closed, texting $phone1")
        this.sendSms(phone1, "Your ${(contact1.label) ? contact1.label : contact1.name} was closed")
        console.log('Turning lights off')
        
        context.api.devices.sendCommands(context.config.lights, 'switch', off)
    
        }
        

	})

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        if (phone1) {
        console.log("$contact1 was opened, texting $phone1")
        this.sendSms(phone1, "Your ${(contact1.label) ? contact1.label : contact1.name} was opened")
        }
        if (phone2) {
        console.log("$contact1 was opened, texting $phone2")
        this.sendSms(phone2, "Your ${(contact1.label) ? contact1.label : contact1.name} was opened")
        console.log('Turning lights on')
        }
        
        context.api.devices.sendCommands(context.config.lights, 'switch', on)
    
        

	})
