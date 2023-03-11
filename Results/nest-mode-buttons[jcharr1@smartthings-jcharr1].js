
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the button', section => {
            section.deviceSetting('theButton').capability(['button']).name('');

        });


        page.section('Choose Thermostat', section => {
            section.deviceSetting('theThermostat').capability(['thermostat']).name('');

        });


        page.section('Choose mode', section => {
            section.enumSetting('theMode').name('Mode');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theButton, 'button', 'button.pushed', 'pushHandler')

    })

    .subscribedEventHandler('pushHandler', (context, event) => {
        
        console.log("Button pushed: $evt")
        switch ( theMode ) {
        case 'Cool':
        console.log('Turning on cooling...')
        
        context.api.devices.sendCommands(context.config.theThermostat, 'thermostat', cool)
    
        break
        case 'Heat':
        console.log('Turning on heating...')
        
        context.api.devices.sendCommands(context.config.theThermostat, 'thermostat', heat)
    
        break
        case 'Off':
        console.log('Turning off...')
        
        context.api.devices.sendCommands(context.config.theThermostat, 'thermostat', off)
    
        break
        }
        

	})
