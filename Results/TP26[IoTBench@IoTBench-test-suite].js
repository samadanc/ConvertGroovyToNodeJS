
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                let oktoFire = true
                if (lightSensor && lightSensor.currentIlluminance > luxOn ) {
                    oktoFire = false
                }
                if (oktoFire) {
                    lightsOn.on()
                    if (delayMinutes && !onClose) {
                        this.startTimer()
                    }
                }
            

	})

    .subscribedEventHandler('startTimer', (context, event) => {
        
                this.runIn(delayMinutes * 60, turnOffAfterDelay, ['overwrite': true])
            

	})
