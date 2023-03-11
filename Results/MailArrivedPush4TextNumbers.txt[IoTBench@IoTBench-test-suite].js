
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When mail arrives...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Then send this message', section => {
            section.textSetting('messageText').name('Message Text');
            section.enumSetting('pushMsg').name('Send push message?');

        });


        page.section('Send Text Message to...(optional)', section => {

        });


        page.section('Send Text Message to...(optional)', section => {

        });


        page.section('Send Text Message to...(optional)', section => {

        });


        page.section('Send Text Message to...(optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        log.trace("${event.value}: $evt, $settings")
        let deltaSeconds = 5
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.accelerationSensor, 'accelerationSensor', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'active'
        }) > 3
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaSeconds seconds")
        } else {
        console.log("$accelerationSensor has moved, texting $phone1")
        if (pushMsg == 'Yes') {
        console.log('sending push')
        this.sendPush(messageText)
        }
        if (phone1) {
        console.log('sending SMS')
        this.sendSms(phone1, messageText)
        }
        if (phone2) {
        console.log('sending SMS')
        this.sendSms(phone2, messageText)
        }
        if (phone3) {
        console.log('sending SMS')
        this.sendSms(phone3, messageText)
        }
        if (phone4) {
        console.log('sending SMS')
        this.sendSms(phone4, messageText)
        }
        }
        

	})
