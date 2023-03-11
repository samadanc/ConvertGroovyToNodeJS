
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the door lock:', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Automatically lock the door when unlocked...', section => {
            section.numberSetting('minutesLater').name('Delay (in minutes):');

        });


        page.section('Notifications', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if
        this.runIn(minutesLater * 60, lockDoor)
        } else {
        if
        this.unschedule(lockDoor)
        }
        }
        

	})
