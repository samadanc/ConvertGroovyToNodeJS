
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned on or off', section => {
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


        page.section('Shut everything down in this mode', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.master, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("[Multi lights on-off] Turning on: ${this.onSwitches()}")
        this.onSwitches()?.on()
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        if (true) {
        console.log("[Multi lights on-off] Turning off: ${this.offSwitches()}")
        this.offSwitches()?.off()
        }
        

	})
