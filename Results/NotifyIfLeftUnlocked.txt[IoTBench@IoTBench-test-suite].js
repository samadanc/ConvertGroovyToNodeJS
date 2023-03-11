
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('If this lock...', section => {
            section.deviceSetting('aLock').capability(['lock']).name('');
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Open/close sensor (optional)');

        });


        page.section('Left unlocked for...', section => {
            section.numberSetting('duration').name('How many minutes?');

        });


        page.section('Notify me...', section => {
            section.booleanSetting('pushNotification').name('Push notification');
            section.booleanSetting('lockIfClosed').name('Lock the door if it\');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.aLock, 'lock', 'lock', 'lockHandler')

    })

    .subscribedEventHandler('lockHandler', (context, event) => {
        
        log.trace("${event.name} is ${event.value}.")
        if (event.value == 'locked') {
        console.log('Canceling lock check because the door is locked...')
        this.unschedule(notifyUnlocked)
        } else {
        console.log("Starting the countdown for $duration minutes...")
        state.retries = 0
        this.runIn(duration * 60, notifyUnlocked)
        }
        

	})
