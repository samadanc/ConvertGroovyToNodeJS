
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which gate, door , or window sensor should we watch?', section => {
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Enter a contact sensor to monitor');

        });


        page.section('How many seconds do you want to allow the door to remain open before alerting?', section => {
            section.numberSetting('seconds').name('The number of seconds to wait before alerting the first time');
            section.numberSetting('secsNext').name('The number of seconds to wait subsequent alerts');

        });


        page.section('Which lights do you want to flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Flash these lights');
            section.numberSetting('numFlashes').name('Flash them this many times.  (default 3)');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact.closed', 'doorClosed')

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensors, 'contactSensor', 'contact.open', 'doorOpened')

    })

    .subscribedEventHandler('doorOpened', (context, event) => {
        
        console.log("door open checking in $seconds seconds!")
        state.TimeOpened = this.now()
        this.runIn(seconds, checkIfStillOpened, ['overwrite': true])
        

	})

    .subscribedEventHandler('doorClosed', (context, event) => {
        
        console.log('door closed!')
        if (state.TimeOpened && state.alert) {
        this.reportClosed(this.now() - state.TimeOpened)
        }
        state.alert = false
        state.TimeOpened = null
        state.flashing = false
        

	})
