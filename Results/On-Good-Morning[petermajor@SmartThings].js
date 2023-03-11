
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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineChanged')

    })

    .subscribedEventHandler('routineChanged', (context, event) => {
        
        console.log("routineChanged: $evt")
        console.log("evt displayName: ${event.displayName}")
        if (event.displayName == 'Good Morning!') {
        if (this.isDark()) {
        console.log('turning lights on')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        }
        }
        

	})
