
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the devices', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Select a contact sensor');
            section.deviceSetting('switches').capability(['switch']).name('Select a light');

        });


        page.section(''Options'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'openHandler')

    })

    .subscribedEventHandler('openHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
