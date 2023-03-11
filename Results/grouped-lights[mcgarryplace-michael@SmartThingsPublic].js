
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Stateless Virtual Switch', section => {
            section.deviceSetting('svsMaster').capability(['switch']).name('');

        });


        page.section('Lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.svsMaster, 'switch', 'switch.off', 'svsMasterOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.svsMaster, 'switch', 'switch.on', 'svsMasterOnHandler')

    })

    .subscribedEventHandler('svsMasterOffHandler', (context, event) => {
        
        console.log("svsMasterOffHandler called: $evt")
        lights?.off()
        

	})

    .subscribedEventHandler('svsMasterOnHandler', (context, event) => {
        
        console.log("svsMasterOnHandler called: $evt")
        lights?.on()
        

	})
