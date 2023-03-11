
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send alerts from... to...', section => {
            section.textSetting('smsnumber').name('Phone number');
            section.deviceSetting('landroidref').capability(['tone']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.landroidref, 'tone', 'LANdroidSMS', 'smsEventHandler')

    })

    .subscribedEventHandler('smsEventHandler', (context, event) => {
        
        console.log("smsEventHandler called: $messageEvent")
        let SMSPhone = smsnumber
        if (SMSPhone?.trim()) {
        this.sendSmsMessage(SMSPhone, messageEvent.stringValue)
        }
        

	})
