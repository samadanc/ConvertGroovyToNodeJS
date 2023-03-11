
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s no water detected...', section => {
            section.deviceSetting('alarm').capability(['waterSensor']).name('Where?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'waterSensor', 'water.dry', 'waterWetHandler')

    })

    .subscribedEventHandler('waterWetHandler', (context, event) => {
        
        let deltaSeconds = 30
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.alarm, 'waterSensor', eventsSince)
    
        console.log("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'wet'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone within the last $deltaSeconds seconds")
        } else {
        let msg = "${alarm.displayName} has no water!"
        console.log("$alarm is dry, texting $phone")
        this.sendPush(msg)
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        

	})
