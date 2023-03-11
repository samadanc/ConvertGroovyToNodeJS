
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Source switch:', section => {
            section.deviceSetting('thesource').capability(['switch']).name('Where?');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thesource, 'switch', 'switch', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log("eventHandler: ${event.value}")
        if (event.value == 'on') {
        console.log('Turning on')
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        } else {
        if (event.value == 'off') {
        console.log('Turning off')
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', off)
    
        }
        }
        

	})
