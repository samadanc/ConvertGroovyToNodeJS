
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select power meter to monitor...', section => {
            section.deviceSetting('checkPowerMeter').capability(['powerMeter']).name('PowerMeter');

        });


        page.section('Report power less than...', section => {
            section.numberSetting('powerMinimum').name('PowerMinimum');

        });


        page.section('Only report once every N minutes...', section => {
            section.numberSetting('reportEveryMinutes').name('Minutes');

        });


        page.section('Who should be alerted when anomalies are detected?', section => {

        });


        page.section('Debugging...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.checkPowerMeter, 'powerMeter', 'power', 'powerCheck')

    })

    .subscribedEventHandler('powerCheck', (context, event) => {
        
        let meterValue = (event.value as double)
        let minValue = (powerMinimum as double)
        if (meterValue < minValue ) {
        state.powerMinimumCount = state.powerMinimumCount + 1
        if (state.powerMinimumCount > 0) {
        log.info("powerCheck(): found meterValue=$meterValue < minValue=$minValue -- possible power outage")
        let msg = "Meter "$checkPowerMeter" reporting too low power usage : $meterValue W"
        this.checkSendPowerNotification(msg)
        } else {
        this.logDebug("powerCheck(): accumulating < min readings (count=${state.powerMinimumCount})")
        }
        } else {
        this.logDebug("powerCheck(): skip good meterValue=$meterValue >= minValue=$minValue")
        state.powerMinimumCount = 0
        state.reportedTime = 0
        }
        

	})
