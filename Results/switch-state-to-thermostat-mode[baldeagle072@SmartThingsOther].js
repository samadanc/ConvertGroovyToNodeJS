
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('masterSwitch').capability(['switch']).name('Master Switch');
            section.deviceSetting('slaveTstat').capability(['thermostat']).name('Slave Thermostat');

        });


        page.section('Preferences', section => {
            section.enumSetting('setMode').name('Thermostat Mode when On');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.masterSwitch, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        
        context.api.devices.sendCommands(context.config.slaveTstat, 'thermostat', setThermostatMode)
    
        } else {
        
        context.api.devices.sendCommands(context.config.slaveTstat, 'thermostat', setThermostatMode)
    
        }
        

	})
