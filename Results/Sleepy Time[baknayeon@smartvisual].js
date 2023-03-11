
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('jawboneHandler', (context, event) => {
        
        if (event.value == 'sleeping' && sleepPhrase ) {
        console.log('Sleeping')
        this.sendNotificationEvent("Sleepy Time performing "$sleepPhrase" for you as requested.")
        location.helloHome.execute(settings.sleepPhrase)
        } else {
        if (event.value == 'not sleeping' && wakePhrase ) {
        console.log('Awake')
        this.sendNotificationEvent("Sleepy Time performing "$wakePhrase" for you as requested.")
        location.helloHome.execute(settings.wakePhrase)
        }
        }
        

	})
