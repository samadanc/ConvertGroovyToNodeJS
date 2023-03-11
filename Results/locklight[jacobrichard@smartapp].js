
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the door opens...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('Which Door');

        });


        page.section('Turn on a Dimmable Light', section => {
            section.deviceSetting('switches').capability(['switchLevel']).name('Which Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.unlocked', 'contactOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.lock1, 'lock', 'lock.locked', 'contactClosedHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', setLevel)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', on)
    
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', off)
    
        

	})

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.switches, 'switchLevel', off)
    
        

	})
