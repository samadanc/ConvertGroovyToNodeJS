
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I arrive and leave...', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Turn on/off a light...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        if (presenceValue) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        

	})
