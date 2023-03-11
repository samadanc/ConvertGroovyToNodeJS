
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Preferences', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('Thermostat');
            section.enumSetting('heatOrCool').name('Heat or Cool?');
            section.deviceSetting('switch1').capability(['switch']).name('Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'offSwitchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'onSwitchHandler')

    })

    .subscribedEventHandler('offSwitchHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', off)
    
        

	})

    .subscribedEventHandler('onSwitchHandler', (context, event) => {
        
        if (heatOrCool == 'Heat') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', heat)
    
        }
        if (heatOrCool == 'Cool') {
        
        context.api.devices.sendCommands(context.config.thermostat, 'thermostat', cool)
    
        }
        

	})
