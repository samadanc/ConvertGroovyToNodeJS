
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
                if (!atomicState.lastValue) {
                    atomicState.lastValue = meterValue 
                }
                let lastValue = (atomicState.lastValue as double)
                atomicState.lastValue = meterValue 
                let aboveThresholdValue = (threshold as int)
                if (meterValue > aboveThresholdValue ) {
                    if (lastValue < aboveThresholdValue ) {
                        console.log("$meter reported energy consumption above $threshold. Run Routine $phrase_on .")
                        location.helloHome.execute(settings.phrase_on)
                    } else {
                    }
                }
                let belowThresholdValue = (threshold as int)
                if (meterValue < belowThresholdValue ) {
                    if (lastValue > belowThresholdValue ) {
                        console.log("$meter reported energy consumption below $threshold. Run Routine $phrase_off .")
                        location.helloHome.execute(settings.phrase_off)
                    } else {
                    }
                }
            

	})
