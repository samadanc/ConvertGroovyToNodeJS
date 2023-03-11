
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices...', section => {
            section.deviceSetting('panel').capability(['switch']).name('Switch Panel...');
            section.deviceSetting('receiver').capability(['switch']).name('Stereo Receiver...');
            section.deviceSetting('masterLighting').capability(['switch']).name('Master Lighting...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.panel, 'switch', 'switchAutoLighting', 'autoLightingChanged')

        await context.api.subscriptions.subscribeToDevices(context.config.panel, 'switch', 'mediaConfigured', 'mediaConfigured')

    })

    .subscribedEventHandler('autoLightingChanged', (context, event) => {
        
        this.log("autoLightingChanged(${event.value})")
        event.value == 'on' ? masterLighting.enable
        

	})

    .subscribedEventHandler('mediaConfigured', (context, event) => {
        
        this.log("mediaConfigured(${event.value})")
        this.configureReceiver()
        

	})
