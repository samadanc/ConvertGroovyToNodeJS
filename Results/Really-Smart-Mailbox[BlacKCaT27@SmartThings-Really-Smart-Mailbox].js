
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When mail arrives...', section => {
            section.deviceSetting('accelerationSensor').capability(['accelerationSensor']).name('Where?');

        });


        page.section('and when this device gets home...', section => {
            section.deviceSetting('presenceSensor').capability(['presenceSensor']).name('Which device?');

        });


        page.section('give me this much time to get the mail...', section => {
            section.numberSetting('blockTimeout').name('Minutes');

        });


        page.section('If I don\'t gather the mail, remind me every...', section => {
            section.numberSetting('reminderInterval').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceSensor, 'presenceSensor', 'presence.present', 'presencePresentHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.accelerationSensor, 'accelerationSensor', 'acceleration.active', 'accelerationActiveHandler')

    })

    .subscribedEventHandler('accelerationActiveHandler', (context, event) => {
        
        if (state.mailboxFull == true) {
        this.unschedule()
        state.mailboxFull = false
        return null
        }
        let timeoutCheck = 0
        let blockTimeoutMS = blockTimeout * 60000
        if (state.timeOfLastNotification != 0 && state.timeOfLastNotification != null) {
        console.log('Found an old notification record...')
        console.log("Time of last notification: ${state.timeOfLastNotification}")
        timeoutCheck = this.now() - state.timeOfLastNotification
        console.log("New value of timeoutCheck: $timeoutCheck")
        } else {
        console.log('No old notifications found.')
        timeoutCheck = blockTimeoutMS + 1
        }
        console.log("timeoutCheck value: $timeoutCheck")
        console.log("blockTimeout in ms: $blockTimeoutMS")
        if (timeoutCheck < blockTimeoutMS ) {
        console.log("Already notified user within the last $blockTimeout minute(s)")
        } else {
        
        context.api.devices.sendCommands(context.config.presenceSensor, 'presenceSensor', currentState)
    
        if (isPresent.stringValue == 'present') {
        this.notifyUser()
        console.log('User is home!')
        } else {
        state.queueNotification = true
        console.log('User is not home. Queuing notification...')
        }
        }
        

	})

    .subscribedEventHandler('presencePresentHandler', (context, event) => {
        
        if (state.queueNotification == true) {
        console.log('Queued event found. Notifying user...')
        this.notifyUser()
        } else {
        console.log('No queued events found.')
        }
        

	})
