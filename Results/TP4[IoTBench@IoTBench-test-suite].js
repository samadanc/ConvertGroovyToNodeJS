
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('handleTreeOffEvent', (context, event) => {
        
                if (leakDetector.currentValue('water') == 'dry') {
                    this.treeOff()
                }
            

	})

    .subscribedEventHandler('handleWaterEvent', (context, event) => {
        
                if (!allowedToRun) {
                    log.trace("${app.name}: water event not allowed.")
                    return null
                }
                if (event.value == 'dry') {
                    log.info("Detected ${event.device} is DRY!!!" + treeSwitch ? ", turning tree OFF in $treeOffAfter minutes" : '' + sendPush ? ", sending notification in $pushAfter minutes" : '')
                    if (treeSwitch) {
                        if (treeOffAfter > 0) {
                            this.runIn(treeOffAfter * 60, treeOff)
                        } else {
                            this.treeOff()
                        }
                    }
                    if (sendPush) {
                        this.runIn(pushAfter * 60, doPush)
                    }
                } else {
                    log.info("Detected ${event.device} water level ok.")
                    this.unschedule()
                }
            

	})
