
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which doors & windows would you like to monitor?', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Select doors/windows');

        });


        page.section('After how many minutes do you want to be notified?', section => {
            section.numberSetting('minsUntilNotify').name('Number of minutes');

        });


        page.section('How often do you want to be notified?', section => {
            section.numberSetting('minsRepeatNotify').name('Number of minutes');

        });


        page.section('How many times do you want to be notified?', section => {
            section.numberSetting('numNotify').name('Number of notifications');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'delayHandler')

    })

    .subscribedEventHandler('delayHandler', (context, event) => {
        
        console.log("${event.value}")
        this.runIn(minsUntilNotify * 60, handler)
        

	})
