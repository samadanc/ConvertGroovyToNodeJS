
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a presence sensor arrives/departs this location...', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which sensor?');

        });


        page.section('Turn this switch off on arrival and on on departure...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        if (event.value == 'present') {
        console.log("${(presence.label) ? presence.label : presence.name} has arrived at $location, turning switch off")
        this.sendPush("${(presence.label) ? presence.label : presence.name} has arrived at $location, turning switch off")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        } else {
        if (event.value == 'not present') {
        console.log("${(presence.label) ? presence.label : presence.name} has left $location, turning switch on")
        this.sendPush("${(presence.label) ? presence.label : presence.name} has left $location, turning switch on")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        }
        

	})
