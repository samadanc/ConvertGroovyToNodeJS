
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''When Mail Arrives - dcyonce'', section => {

        });


        page.section('When the door opens...', section => {
            section.deviceSetting('mailbox').capability(['contactSensor']).name('Where?');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.mailbox, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        let msg = "Your ${(mailbox.label) ? mailbox.label : mailbox.name} was opened"
        log.trace("${event.value}: $evt, $settings")
        console.log("$mailbox was opened, sending push message to user")
        console.log(msg)
        if (phone1) {
        this.sendSms(phone1, msg)
        }
        if (phone2) {
        this.sendSms(phone2, msg)
        }
        

	})
