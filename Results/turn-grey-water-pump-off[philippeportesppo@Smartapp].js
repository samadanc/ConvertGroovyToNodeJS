
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('thresholdhigh').name('Consumes above pump sucking power (water sucked)...');
            section.numberSetting('thresholdlow').name('Then goes below pump sucking power (air sucked)...');

        });


        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn Off These Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        state.upperThresholdPassed = 0
        

	})

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        let thresholdValueHigh = (thresholdhigh as int)
        let thresholdValueLow = (thresholdlow as int)
        if (meterValue > thresholdValueHigh ) {
        state.upperThresholdPassed = 1
        console.log("$meter reported energy consumption above threshold $threshold. Pump is sucking.")
        }
        if (meterValue < thresholdValueLow && state.upperThresholdPassed == 1) {
        console.log("$meter reported energy consumption below min threshold $threshold. Turning off pump.")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        state.upperThresholdPassed = 0
        }
        

	})
