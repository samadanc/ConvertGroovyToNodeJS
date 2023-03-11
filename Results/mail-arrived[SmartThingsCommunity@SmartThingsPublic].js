
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When mail arrives...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('Notify me...', section => {
            section.booleanSetting('pushNotification').name('Push notification');

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
        let alreadySentNotifications = recentEvents.count({
        it.value && it.value == 'active'
        }) > 1
        if (alreadySentNotifications) {
        console.log("Notifications already sent within the last $deltaSeconds seconds (phone1: $phone1, pushNotification: $pushNotification)")
        } else {
        if (location.contactBookEnabled) {
        console.log("$accelerationSensor has moved, notifying ${recipients?.size()}")
        this.sendNotificationToContacts('Mail has arrived!', recipients)
        } else {
        if (phone1 != null && phone1 != '') {
        console.log("$accelerationSensor has moved, texting $phone1")
        this.sendSms(phone1, 'Mail has arrived!')
        }
        if (pushNotification) {
        console.log("$accelerationSensor has moved, sending push")
        this.sendPush('Mail has arrived!')
        }
        }
        }
        

	})
