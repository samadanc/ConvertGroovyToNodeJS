
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Your Mailbox', section => {
            section.deviceSetting('mailbox').capability(['contactSensor']).name('Pick your Mailbox Sensor');

        });


        page.section('Your Preferred Door of Furtive Entrance', section => {
            section.deviceSetting('door').capability(['contactSensor']).name('Pick your Door Sensor');

        });


        page.section('The Bed Where Motion Will Be Detected.', section => {
            section.deviceSetting('bed').capability(['motionSensor']).name('Pick your Bed Motion Sensor');

        });


        page.section('Time Window During Which You\'re Out of the House', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.mailbox, 'contactSensor', 'contact.closed', 'mailMan')

    })

    .subscribedEventHandler('mailMan', (context, event) => {
        
        if (this.inTimeWindow() == true) {
        this.subscribe(door, 'contact', hesMadeItToTheDoor)
        let freq = timeToDoor * 60000
        this.schedule("0 0/$freq * * * ?", unsubDoor)
        this.unsubscribe(mailbox)
        } else {
        console.log('Nothing suspicious...we think')
        }
        

	})
