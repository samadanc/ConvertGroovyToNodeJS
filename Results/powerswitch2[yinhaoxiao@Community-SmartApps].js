
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('threshold').name('Reports Above...');

        });


        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn ON This Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        let cycleOn = false
        if (!state.cycleOn && meterValue > thresholdValue ) {
        console.log("$meter reported energy consumption above $threshold. Turning $switches on.")
        state.cycleOn = true
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        } else {
        if (state.cycleOn && meterValue <= thresholdValue ) {
        console.log("$meter reported energy consumption below $threshold. Turning $switches off.")
        state.cycleOn = false
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        }
        }
        

	})
