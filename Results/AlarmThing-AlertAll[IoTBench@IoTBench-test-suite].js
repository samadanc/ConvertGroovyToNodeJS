
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notify me when there is any activity on this alarm:', section => {
            section.deviceSetting('theAlarm').capability(['alarm']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theAlarm, 'alarm', 'contact', 'contactTriggered')

        await context.api.subscriptions.subscribeToDevices(context.config.theAlarm, 'alarm', 'motion', 'motionTriggered')

    })

    .subscribedEventHandler('motionTriggered', (context, event) => {
        
        if (event.value == 'active') {
        this.sendPush('Alarm motion detected')
        }
        

	})

    .subscribedEventHandler('contactTriggered', (context, event) => {
        
        if (event.value == 'open') {
        this.sendPush('A door was opened')
        } else {
        this.sendPush('A door was closed')
        }
        

	})
