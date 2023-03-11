
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Monitor which switch?');
            section.deviceSetting('notificationSwitch').capability(['switch']).name('Select Virtual Snooze Switch');

        });


        page.section('Notification Type', section => {
            section.enumSetting('pushAndPhone').name('Also send SMS? (optional, it will always send push)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.mySwitch, 'switch', 'switch', 'eventHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.notificationSwitch, 'switch', 'switch', 'snoozer')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log('received evt')
        if (!state.snoozing) {
        console.log('sending message')
        this.sendMessage("${mySwitch.displayName} is now on. Snooze https://www.google.com/")
        } else {
        console.log('snoozing, no message sent')
        }
        

	})

    .subscribedEventHandler('snoozer', (context, event) => {
        
        console.log('snoozing switch toggled')
        if (event.value == 'on') {
        state.snoozing = true
        console.log('snoozing')
        }
        if (event.value == 'off') {
        state.snoozing = false
        console.log('snoozing off')
        }
        

	})
