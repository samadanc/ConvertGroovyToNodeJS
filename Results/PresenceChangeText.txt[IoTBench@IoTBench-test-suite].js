
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a presence sensor arrives or departs this location..', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which sensor?');

        });


        page.section('Send a text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        console.log("${(presence.label) ? presence.label : presence.name} has arrived at the $location")
        this.sendSms(phone1, "${(presence.label) ? presence.label : presence.name} has arrived at the $location")
        } else {
        if (event.value == 'not present') {
        console.log("${(presence.label) ? presence.label : presence.name} has left the $location")
        this.sendSms(phone1, "${(presence.label) ? presence.label : presence.name} has left the $location")
        }
        }
        

	})
