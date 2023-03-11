
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door state changes', section => {
            section.deviceSetting('doorSensor').capability(['doorControl']).name('Select CoopBoss');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doorSensor, 'doorControl', 'doorState', 'coopDoorStateHandler')

    })

    .subscribedEventHandler('coopDoorStateHandler', (context, event) => {
        
        if (event.value == 'jammed') {
        let msg = "WARNING ${doorSensor.displayName} door is jammed and did not close!"
        console.log("WARNING ${doorSensor.displayName} door is jammed and did not close, texting $phone")
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
