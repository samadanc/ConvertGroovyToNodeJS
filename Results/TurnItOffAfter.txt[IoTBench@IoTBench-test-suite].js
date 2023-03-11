
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When it is turned on...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Minutes later to turn off (optional)...', section => {
            section.numberSetting('offAfter').name('Off after (default 5)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        let offAfter = offAfter ? offAfter : 5
        let offAfterMilliseconds = offAfter * 60000
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        

	})
