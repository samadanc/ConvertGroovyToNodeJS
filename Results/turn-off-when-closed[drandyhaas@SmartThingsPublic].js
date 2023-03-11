
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When door(s) close(s)...', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which door(s)?');

        });


        page.section('Turn off switch(es)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.closed', 'closedHandler')

    })

    .subscribedEventHandler('closedHandler', (context, event) => {
        
        let val = event.value
        console.log("value: $val, settings: $settings ")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})
