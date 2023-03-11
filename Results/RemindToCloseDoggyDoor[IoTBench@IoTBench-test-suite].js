
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Which door?');

        });


        page.section('Still open past', section => {
            section.timeSetting('timeOfDay').name('What time?');

        });


        page.section('Notify', section => {
            section.booleanSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkDoor', delay);

    })

    .scheduledEventHandler('checkDoor', (context, event) => {
        
        if
        console.log("$door is open, sending notification.")
        let message = "Remember to close the $door!"
        this.send(message)
        }
        

	})
