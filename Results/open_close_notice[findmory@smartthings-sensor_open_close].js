
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door closes...', section => {
            section.deviceSetting('contactClosed').capability(['contactSensor']).name('Contact Closes');

        });


        page.section('When the door opens...', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Opens');

        });


        page.section('Send a text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.open', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contactClosed, 'contactSensor', 'contact.closed', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        if (event.value == atomicState.lastExecution && event.displayName == atomicState.lastDevice) {
        log.trace('repeat so skipping')
        return null
        } else {
        atomicState.lastExecution = event.value
        atomicState.lastDevice = event.displayName
        }
        let now = new Date()
        let nowFormatted = now.format('EEE, MMM d h:mm:ss a', TimeZone.getTimeZone('America/New_York'))
        this.sendSms(phone1, "$nowFormatted
        ${event.displayName} ${event.value.toUpperCase()}")
        if (phone2 != '') {
        this.sendSms(phone2, "$nowFormatted
        ${event.displayName} ${event.value.toUpperCase()}")
        }
        

	})
