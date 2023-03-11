
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights', section => {
            section.deviceSetting('light').capability(['switch']).name('Overhead Light');
            section.deviceSetting('dimmer').capability(['switchLevel']).name('Island Dimmer');
            section.deviceSetting('led').capability(['switch']).name('LED Strips');

        });


        page.section('Options', section => {
            section.booleanSetting('forceColor').name('Force LEDs to White?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'level', 'dimmerAdjusted')

        await context.api.subscriptions.subscribeToDevices(context.config.dimmer, 'switchLevel', 'switch', 'dimmerAdjusted')

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch', 'lightChanged')

    })

    .subscribedEventHandler('dimmerAdjusted', (context, event) => {
        
        this.adjustLED()
        

	})

    .subscribedEventHandler('lightChanged', (context, event) => {
        
        this.adjustLED()
        

	})
