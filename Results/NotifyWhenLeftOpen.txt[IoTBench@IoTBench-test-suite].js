
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When . . .', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Something is left open');
            section.numberSetting('numMinutes').name('For how many minutes');
            section.textSetting('messageText').name('Send notification that says');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'onContactChange')

    })

    .subscribedEventHandler('onContactChange', (context, event) => {
        
        console.log('onContactChange')
        if (event.value == 'open') {
        this.runIn(numMinutes * 60, onContactLeftOpenHandler)
        } else {
        this.unschedule(onContactLeftOpenHandler)
        }
        

	})
