
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Contact Sensors', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Select Doors/Windows:');

        });


        page.section('Lights & Switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('Select Lights and Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        if (evt?.value == 'open') {
        let openContacts = contacts.findAll({
        it?.latestValue('contact') == 'open'
        })
        if (openContacts.size() == 1) {
        switches?.on()
        }
        } else {
        let openContacts = contacts.findAll({
        it?.latestValue('contact') == 'open'
        })
        if (openContacts.size() == 0) {
        switches?.off()
        }
        }
        

	})
