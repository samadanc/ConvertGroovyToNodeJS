
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on or off', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on or off all of these thermostat fans as well', section => {
            section.deviceSetting('thermostats').capability(['thermostat']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log('Turning on Thermostat Fans')
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', fanOn)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log('Turning off Thermostat Fans')
        
        context.api.devices.sendCommands(context.config.thermostats, 'thermostat', fanAuto)
    
        

	})
