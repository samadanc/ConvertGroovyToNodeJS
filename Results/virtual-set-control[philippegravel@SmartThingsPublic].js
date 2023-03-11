
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Switch to be set', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('Switch to start?');
            section.deviceSetting('theScene').capability(['switch']).name('Switch to control Scene?');
            section.numberSetting('theLevel').name('Number on Control Scene?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('Events: ' + event.displayName)
        
        context.api.devices.sendCommands(context.config.theScene, 'switch', setLevel)
    
        theSwitch
        

	})
