
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When one of these people arrive at home', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Set this thermostat staus to home', section => {
            section.deviceSetting('thermostat1').capability(['thermostat']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence1, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("presenceHandler ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.presence1, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = presence1.find({
        it.currentPresence == 'present'
        })
        console.log(presenceValue)
        if (presenceValue) {
        thermostat1?.present()
        console.log('SmartThings changed your thermostat to home because someone arrived home')
        }
        

	})
