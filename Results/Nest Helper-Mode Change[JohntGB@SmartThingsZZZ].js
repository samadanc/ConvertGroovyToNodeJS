
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section(''Apache License'', section => {

        });


        page.section(''Instructions'', section => {

        });


        page.section(''Tap button below to remove the application'', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'locationHandler')

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                console.log("Mode set to ${event.value}")
                let currentState = tstat1.latestValue('presence')
                if (awayMode && awayMode.contains(event.value)) {
                    tstat1.away()
                    console.log('Nest set to AWAY')
                } else {
                    if (currentState == 'not present' && !homeMode || homeMode && homeMode.contains(event.value)) {
                        tstat1.present()
                        console.log('Nest set to HOME')
                    }
                }
            

	})
