
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns on...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Pulse this...', section => {
            section.deviceSetting('thePulse').capability(['switch']).name('');

        });


        page.section('Turn it off how many SECONDS later?', section => {
            section.numberSetting('secondsLater').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("Switch $theSwitch turned: ${event.value}")
        
        context.api.devices.sendCommands(context.config.thePulse, 'switch', on)
    
        let delay = secondsLater * 1000
        console.log("Turning off in $secondsLater minutes ($delayms)")
        
        context.api.devices.sendCommands(context.config.thePulse, 'switch', off)
    
        

	})
