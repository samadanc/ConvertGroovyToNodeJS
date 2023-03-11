
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on which switches or outlets?', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'switchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log('I see a switch was turned off... I\'m turning them all off!')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log('I see a switch was turned on... I\'m turning them all on!')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
