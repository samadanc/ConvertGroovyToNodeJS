
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('Power meter to use as Master');
            section.numberSetting('threshold').name('Master device on/off power level');

        });


        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('Control these Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        if (meterValue > thresholdValue ) {
        if (!(state.MasterOn == 'on')) {
        console.log("$meter reported energy consumption at or above $threshold. Turning on switches.")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        state.MasterOn = 'on'
        } else {
        console.log("$meter reported energy consumption at or above $threshold, but device was already on when previously reported.")
        }
        } else {
        if (!(state.MasterOn == 'off')) {
        console.log("$meter reported energy consumption below $threshold. Turning off switches.")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', off)
    
        state.MasterOn = 'off'
        } else {
        console.log("$meter reported energy consumption below $threshold, but device was already on when previously reported.")
        }
        }
        

	})
