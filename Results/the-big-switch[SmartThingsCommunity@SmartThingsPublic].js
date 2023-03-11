
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on, off or dimmed', section => {
            section.deviceSetting('master').capability(['switch']).name('Where?');

        });


        page.section('Turn on or off all of these switches as well', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('And turn off but not on all of these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('And turn on but not off all of these switches', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('');

        });


        page.section('And Dim these switches', section => {
            section.deviceSetting('dimSwitches').capability(['switchLevel']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'level', 'dimHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log(event.value)
        console.log(this.onSwitches())
        this.onSwitches()?.on()
        

	})

    .subscribedEventHandler('dimHandler', (context, event) => {
        
        console.log("Dim level: ${event.value}")
        dimSwitches?.setLevel(event.value)
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log(event.value)
        console.log(this.offSwitches())
        this.offSwitches()?.off()
        

	})
