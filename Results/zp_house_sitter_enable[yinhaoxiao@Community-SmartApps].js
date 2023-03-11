
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Real Presence Sensor', section => {
            section.deviceSetting('presenceReal').capability(['presenceSensor']).name('Real?');

        });


        page.section('Select Virtal Presence Sensor', section => {
            section.deviceSetting('presenceVirt').capability(['presenceSensor']).name('Virtual');

        });


        page.section('Select House Sitter Virtual Switch', section => {
            section.deviceSetting('enableSwitch').capability(['switch']).name('Enable Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceReal, 'presenceSensor', 'presence', 'presenceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.enableSwitch, 'switch', 'switch', 'presenceHandler')

    })

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log('Event presenceHandler')
        
        context.api.devices.sendCommands(context.config.presenceReal, 'presenceSensor', currentValue)
    
        
        context.api.devices.sendCommands(context.config.enableSwitch, 'switch', currentValue)
    
        console.log("Real Presence: $realPresence")
        console.log("Enable Switch $switchEnable")
        if (switchEnable == 'off') {
        
        context.api.devices.sendCommands(context.config.presenceVirt, 'presenceSensor', notPresent)
    
        } else {
        if (realPresence == 'present') {
        
        context.api.devices.sendCommands(context.config.presenceVirt, 'presenceSensor', present)
    
        } else {
        
        context.api.devices.sendCommands(context.config.presenceVirt, 'presenceSensor', notPresent)
    
        }
        }
        

	})
