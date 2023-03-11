
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('My Medicine Draw/Cabinet', section => {
            section.deviceSetting('deviceContactSensor').capability(['contactSensor']).name('Opened Sensor');

        });


        page.section('Remind me to take my medicine at', section => {
            section.timeSetting('reminderTime').name('Time');

        });


        page.section('My LED Light', section => {
            section.deviceSetting('deviceLight').capability(['colorControl']).name('Smart light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.deviceContactSensor, 'contactSensor', 'contact', 'contactHandler')

        context.api.schedules.schedule('checkOpenDrawInPast', delay);

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
        if (event.value == 'open') {
        console.log('Cabinet opened')
        if (state.ledNotificationTriggered) {
        this.resetLEDNotification()
        }
        }
        

	})

    .scheduledEventHandler('checkOpenDrawInPast', (context, event) => {
        
        console.log("Checking past 60 minutes of activity from $reminderTime")
        let cabinetOpened = this.isOpened(state.minutesToCheckOpenDraw)
        console.log("Cabinet found opened: $cabinetOpened")
        if (!cabinetOpened) {
        this.sendNotification('Hi, please remember to take your meds in the cabinet')
        let reminderTimePlus10 = new Date(this.now() + 10 * 60000)
        this.runOnce(reminderTimePlus10, checkOpenDrawAfterReminder)
        }
        

	})
