
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Receive turn on/off command:', section => {
            section.deviceSetting('masterlamp').capability(['switch']).name('');

        });


        page.section('Turn on/off when master lamp is turned on:', section => {
            section.deviceSetting('slavelamp').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masterlamp, 'switch', 'switch', 'masterHandler')

    })

    .subscribedEventHandler('masterHandler', (context, event) => {
        
        console.log("MasterHandler: $evt, ${event.value}")
        
        context.api.devices.sendCommands(context.config.masterlamp, 'switch', currentState)
    
        console.log("State of the master lamp ${masterLampState.value}")
        console.log("State of evt ${event.value}")
        if (masterLampState.value == 'on') {
        console.log('Turning on lamps')
        
        context.api.devices.sendCommands(context.config.masterlamp, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.slavelamp, 'switch', on)
    
        } else {
        if (masterLampState.value == 'off') {
        
        context.api.devices.sendCommands(context.config.masterlamp, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.slavelamp, 'switch', off)
    
        }
        }
        

	})
