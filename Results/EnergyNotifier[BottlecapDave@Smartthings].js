
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('threshold').name('Reports above...');

        });


        page.section('After time has passed...', section => {
            section.numberSetting('hourspassed').name('Hours');
            section.numberSetting('minutespassed').name('Minutes');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        console.log("$meter reported energy consumption of $meterValue. Last value is ${state.lastvalue}")
        if (meterValue >= thresholdValue ) {
        if (state.isSwitchOffScheduled == false) {
        state.isSwitchOffScheduled = true
        console.log("$meter reported energy consumption above $threshold. Scheduling to notify.")
        this.runIn(hourspassed * 60 * 60 + minutespassed * 60, switchOff)
        }
        } else {
        state.isSwitchOffScheduled = false
        }
        state.lastvalue = meterValue
        

	})
