
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Send a push alert when these devices open or are active...', section => {
            section.deviceSetting('contactsensor').capability(['contactSensor']).name('Which Doors?');
            section.deviceSetting('motionsensor').capability(['motionSensor']).name('Which Motion Sensors?');

        });


        page.section('While this alarm is in silent mode...', section => {
            section.deviceSetting('theAlarm').capability(['alarm']).name('Which Alarm?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionsensor, 'motionSensor', 'motion', 'onChange')

        await context.api.subscriptions.subscribeToDevices(context.config.contactsensor, 'contactSensor', 'contact', 'onChange')

    })

    .subscribedEventHandler('onChange', (context, event) => {
        
        console.log("Processing event event: name ${event.name}, value ${event.value}")
        
        context.api.devices.sendCommands(context.config.theAlarm, 'alarm', currentState)
    
        if (alarm_arm_state.value != 'silent') {
        console.log("Alarm is not in silent mode (current state is ${alarm_arm_state.value}).")
        return null
        }
        if (event.value != 'open' && event.value != 'active') {
        console.log('Event was not open (for contact) or active (for motion sensor).')
        return null
        }
        if (state.recent_push_was_sent == true) {
        console.log('Silent alarm tripped again, but not sending more than one push alert in under 60 secs.')
        return null
        }
        state.recent_push_was_sent = true
        console.log('Silent Alarm has been tripped, sending push alert')
        this.sendPush('Silent Alarm has been tripped')
        this.runIn(60, reset_recent_push_was_sent)
        

	})
