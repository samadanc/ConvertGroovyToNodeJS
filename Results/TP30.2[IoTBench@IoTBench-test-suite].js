
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a door unlocks...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Lock it how many minutes later?', section => {
            section.numberSetting('minutesLater').name('When?');

        });


        page.section('Lock it only when this door is closed', section => {
            section.deviceSetting('openSensor').capability(['contactSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.closed', 'doorClosed')

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.open', 'doorOpen')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        console.log("Door ${openSensor.latestValue}")
        console.log("Lock ${event.name} is ${event.value}.")
        if (event.value == 'locked') {
        console.log('Cancelling previous lock task...')
        this.unschedule(lockDoor)
        } else {
        let delay = minutesLater * 60
        console.log("Re-arming lock in $minutesLater minutes ($delays).")
        this.runIn(delay, lockDoor)
        }
        

	})

    .subscribedEventHandler('doorClosed', (context, event) => {
        
        console.log('Door Closed')
        

	})

    .subscribedEventHandler('doorOpen', (context, event) => {
        
        console.log('Door open reset previous lock task...')
        this.unschedule(lockDoor)
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        

	})
