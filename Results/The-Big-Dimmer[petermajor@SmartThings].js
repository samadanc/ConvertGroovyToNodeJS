
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on, off or dimmed', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Dim these switches', section => {
            section.deviceSetting('dimSwitches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'level', 'dimHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log('On')
        console.log("Dim level: ${master.currentLevel}")
        dimSwitches?.on()
        dimSwitches?.setLevel(master.currentLevel)
        

	})

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        let newLevel = event.value.toInteger()
        console.log("Dim level: $newLevel")
        dimSwitches?.setLevel(newLevel)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log('Off')
        dimSwitches?.off()
        

	})
