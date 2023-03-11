
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Dimmer to make bright when turned on', section => {
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Which dimmer?');
            section.numberSetting('brightness').name('Light Level');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.dimmer, 'switchLevel', setLevel)
    
        console.log("setting brightness: $brightness")
        

	})
