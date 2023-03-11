
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this plug sees a load...', section => {
            section.deviceSetting('mastermeteringplug').capability(['energyMeter']).name('Which master?');

        });


        page.section('light these lamps...', section => {
            section.deviceSetting('lamp').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.mastermeteringplug, 'energyMeter', 'power', 'masterHandler')

    })

    .subscribedEventHandler('masterHandler', (context, event) => {
        
        console.log("master power level: ${event.value}")
        if (event.integerValue != 0) {
        console.log('lamp on')
        
        context.api.devices.sendCommands(context.config.lamp, 'switch', on)
    
        }
        if (event.value == '0') {
        console.log('lamp off')
        
        context.api.devices.sendCommands(context.config.lamp, 'switch', off)
    
        }
        

	})
