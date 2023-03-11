
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door', section => {
            section.deviceSetting('door').capability(['refresh']).name('Pick a garage door');

        });


        page.section('Contact Sensor', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Pick a contact sensor');
            section.numberSetting('refresh_rate').name('refresh for every N seconds (default 5)');
            section.numberSetting('max_refresh').name('stop refreshing after N minutes (default 2)');

        });


        page.section('Notification', section => {
            section.booleanSetting('push_notif').name('Send push notification when Garage Door device handler failed');
            section.textSetting('phone').name('Phone number to send SMS notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'refresh', 'lastHttpStatus', 'httpHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact', 'contactHandler')

    })

    .subscribedEventHandler('httpHandler', (context, event) => {
        
        console.log("httpHandler: ${event.value}: $evt, $settings")
        if (event.isStateChange() && event.value == 'failed') {
        let msg = "${door.displayName} http request failed, please check your settings."
        if (push_notif) {
        this.sendPush(msg)
        }
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        

	})

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        console.log("contactHandler: ${event.value}: $evt, $settings")
        if (event.isStateChange()) {
        let timestamp = this.now() + 60 * 1000 * this.getMaxRefresh()
        let data = ['stopAt': timestamp ]
        this.forceRefreshGarageState(data)
        }
        

	})
