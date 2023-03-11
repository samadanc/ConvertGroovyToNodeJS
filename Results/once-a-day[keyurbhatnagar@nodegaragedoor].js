
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose one or more...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Contact Opens');

        });


        page.section('Check the status at...', section => {
            section.timeSetting('startTime').name('Run check at what time?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('startTimerCallback', delay);

    })

    .scheduledEventHandler('startTimerCallback', (context, event) => {
        
        console.log('Checking door status')
        let allClosed = true
        contacts.each({ let contact ->
        if (contact.currentValue('contact') == 'open') {
        console.log("$contact was opened, sending push message to user")
        this.sendPush("Your ${(contact.label) ? contact.label : contact.name} is Open!")
        allClosed = false
        }
        })
        if (allClosed) {
        this.sendPush('All doors are closed!')
        }
        

	})
