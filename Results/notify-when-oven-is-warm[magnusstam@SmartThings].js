
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('powerMeterHandler', (context, event) => {
        
                let powerValue = (event.value as double)
                if (!atomicState.lastPowerValue) {
                    atomicState.lastPowerValue = powerValue 
                }
                let lastPowerValue = (atomicState.lastPowerValue as double)
                atomicState.lastPowerValue = powerValue 
                let thresholdValue = (threshold as int)
                if (powerValue < thresholdValue ) {
                    if (lastPowerValue > thresholdValue ) {
                        atomicState.offDetected = this.now()
                        if (atomicState.isFirstTransition == true) {
                            this.sendPush(NotificationText)
                            atomicState.isFirstTransition = false
                        }
                    }
                    let minutesTilPowerConsideredOff = (minutesWithoutPower as int)
                    this.runIn(60 * minutesTilPowerConsideredOff , powerOffHandler)
                } else {
                    if (atomicState.isOn == false) {
                        atomicState.isOn = true
                        atomicState.isFirstTransition = true
                        atomicState.onDetected = this.now()
                        console.log('oven is on')
                    } else {
                        let timeSinceOnDetected = ((this.now() - atomicState.onDetected / 1000 * 60) as int)
                        let max = (maxOnTime as int)
                        console.log("Time since oven was turned on is $timeSinceOnDetected minutes, max is $max minutes")
                        if (timeSinceOnDetected > max ) {
                            this.sendPush(WarningText)
                        }
                    }
                }
            

	})
