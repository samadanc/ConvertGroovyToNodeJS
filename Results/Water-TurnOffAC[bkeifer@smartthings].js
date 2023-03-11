
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Water Sensor', section => {
            section.deviceSetting('water').capability(['waterSensor']).name('Which Water Sensor?');

        });


        page.section('Thermostat(s)', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Which Thermostat(s)?');

        });


        page.section('Send Notifications?', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.water, 'waterSensor', 'water.wet', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        thermostat*.off()
        if (location.contactBookEnabled && recipients ) {
        this.sendNotificationToContacts('Water in AC drip pan!  Turning off the AC!', recipients)
        } else {
        if (phone) {
        this.sendSms(phone, 'Water in AC drip pan!  Turning off the AC!')
        }
        }
        

	})
