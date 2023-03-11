
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door locks:', section => {
            section.deviceSetting('locks').capability(['lock']).name('');

        });


        page.section('Automatically lock the door when unlocked...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Disable auto lock when...', section => {

        });


        page.section('Notifications for Success', section => {
            section.enumSetting('sendPushSuccess').name('Send a push notification?');

        });


        page.section('Notifications for Errors', section => {
            section.enumSetting('sendPushError').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log('Handling event: ' + event.value)
        let unlocked = locks.find({
        it.latestValue('lock') == 'unlocked'
        })
        if (unlocked && event.value == 'unlocked') {
        console.log("Scheduling lock because $unlocked was unlocked")
        try {
        this.runIn(minutesLater * 60, lockDoors)
        }
        catch (let all) {
        this.notifyError('failed to schedule door locking. Doors will not auto lock')
        }
        } else {
        console.log("Not scheduling because ${event.value}")
        }
        

	})
