
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('meter').capability(['powerMeter']).name('When This Power Meter...');
            section.numberSetting('threshold').name('Reports below...');
            section.numberSetting('minutespassed').name('After time has passed...');

        });


        page.section('', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn Off These Switches');

        });


        page.section('Turn off between... ', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.meter, 'powerMeter', 'power', 'meterHandler')

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
        let isBetween = true
        console.log("FromTime: $fromTime; ToTime: $toTime")
        if (fromTime != null && toTime != null) {
        console.log('Checking time of day')
        isBetween = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        }
        console.log("Inbetween: $isBetween")
        if (isBetween) {
        let meterValue = (event.value as double)
        let thresholdValue = (threshold as int)
        console.log("$meter reported energy consumption of $meterValue. Last value is ${state.lastvalue}")
        if (meterValue <= thresholdValue ) {
        if (state.isSwitchOffScheduled == false) {
        state.isSwitchOffScheduled = true
        console.log("$meter reported energy consumption below $threshold. Scheduling to turn off switches.")
        this.runIn(minutespassed * 60, switchOff)
        }
        } else {
        state.isSwitchOffScheduled = false
        }
        state.lastvalue = meterValue
        }
        

	})
