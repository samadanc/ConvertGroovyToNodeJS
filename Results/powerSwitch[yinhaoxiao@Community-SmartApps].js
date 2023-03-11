
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Select Power Meter');
            section.numberSetting('threshold').name('Minimum Wattage Threshold');
            section.numberSetting('minutes').name('Below Threshold Delay');

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
        if (!state.cycleOn && meterValue > thresholdValue ) {
        console.log("Cycle started, turning $switches on.")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.cycleOn = true
        } else {
        if (state.cycleOn && meterValue <= thresholdValue ) {
        if (minutes) {
        this.runIn(minutes * 60, bufferPending)
        state.meterValueOld = meterValue
        } else {
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        state.cycleOn = false
        console.log("Power: $meterValue W, turning $switches off")
        }
        }
        }
        

	})
