
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which lights to turn on?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log('turning on lights at sunset')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        

	})
