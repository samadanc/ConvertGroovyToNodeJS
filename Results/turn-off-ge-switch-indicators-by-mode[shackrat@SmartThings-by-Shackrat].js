
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configure Switches and Mode(s)', section => {
            section.deviceSetting('switches').capability(['indicator']).name('Turn off LED on switches');
            section.enumSetting('defaultMode').name('Otherwise, set to');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeEvent')

    })

    .subscribedEventHandler('modeChangeEvent', (context, event) => {
        
        if (modes.find({
        it == location.mode
        }) != null) {
        console.log("Killing LED Indicators for ${location.mode}")
        
        context.api.devices.sendCommands(context.config.switches, 'indicator', indicatorNever)
    
        } else {
        console.log("Restoring LED Indicators for ${location.mode}")
        if (defaultMode == 'Lit when on') {
        
        context.api.devices.sendCommands(context.config.switches, 'indicator', indicatorWhenOn)
    
        } else {
        
        context.api.devices.sendCommands(context.config.switches, 'indicator', indicatorWhenOff)
    
        }
        }
        

	})
