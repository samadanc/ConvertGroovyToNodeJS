
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Set this person Present', section => {
            section.deviceSetting('pres1').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.pres1, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning on pres: $pres1")
        
        context.api.devices.sendCommands(context.config.pres1, 'presenceSensor', arrived)
    
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log(event.value)
        if (event.value == 'present') {
        console.log("Turning on switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        } else {
        if (event.value == 'not present') {
        console.log("Turning off switch: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        }
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log("Turning off pres: $pres1")
        
        context.api.devices.sendCommands(context.config.pres1, 'presenceSensor', departed)
    
        

	})
