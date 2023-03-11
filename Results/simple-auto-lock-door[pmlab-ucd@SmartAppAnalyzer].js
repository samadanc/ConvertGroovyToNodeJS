
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

        await context.api.subscriptions.subscribeToDevices(context.config.openSensor, 'contactSensor', 'contact.open', 'doorOpen')

    })

    .subscribedEventHandler('doorOpen', (context, event) => {
        
        let delay = minutesLater * 60
        this.runIn(delay, lockDoor)
        

	})
