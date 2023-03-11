
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('meterHandler', (context, event) => {
        
                let meterValue = (event.value as double)
                if (aboveThreshold) {
                    let aboveThresholdValue = (aboveThreshold as int)
                    if (meterValue > aboveThresholdValue ) {
                        console.log("$meter reported energy consumption above $threshold. Turning switches.")
                        this.switchSwitches()
                    }
                }
                if (belowThreshold) {
                    let belowThresholdValue = (belowThreshold as int)
                    if (meterValue < belowThresholdValue ) {
                        console.log("$meter reported energy consumption below $threshold. Turning switches.")
                        this.switchSwitches()
                    }
                }
            

	})
