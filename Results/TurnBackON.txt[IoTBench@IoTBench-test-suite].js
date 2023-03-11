
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When a switch turns off...', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Turn it on how many minutes later?', section => {
            section.numberSetting('minutes').name('When?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.off', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("Switch $theSwitch turned: ${event.value}")
        let delay = minutes * 60 * 1000
        console.log("Turning on in $minutes minutes")
        
        context.api.devices.sendCommands(context.config.theSwitch, 'switch', on)
    
        

	})
