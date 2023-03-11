
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s water detected by...', section => {
            section.deviceSetting('waterSensor').capability(['waterSensor']).name('Where?');

        });


        page.section('Shut off this/these water valve(s)...', section => {
            section.deviceSetting('waterValve').capability(['valve']).name('Which?');

        });


        page.section('Send a notification to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.waterSensor, 'waterSensor', 'water.wet', 'waterWetHandler')

    })

    .subscribedEventHandler('waterWetHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.waterValve, 'valve', close)
    
        let deltaSeconds = 60
        let timeAgo = new Date(this.now() - 1000 * deltaSeconds )
        
        context.api.devices.sendCommands(context.config.waterSensor, 'waterSensor', eventsSince)
    
        console.log("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaSeconds seconds")
        let alreadySentSms = recentEvents.count({
        it.value && it.value == 'wet'
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone within the last $deltaSeconds seconds")
        } else {
        let msg = "${waterSensor.displayName} is wet! Shutting valve(s) ${waterValve.displayName}"
        console.log("$waterSensor is wet, shuting valve $waterValve, texting $phone")
        if (location.contactBookEnabled) {
        this.sendNotificationToContacts(msg, recipients)
        } else {
        this.sendPush(msg)
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        }
        

	})
