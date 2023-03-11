
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('doTempCheck', (context, event) => {
        
                let strMsg = ''
                log.info("(0D) ${app.label} - ${theThermostat.label} is at: ${event.doubleValue}° - $settings")
                switches.each({ 
                    log.trace("(0E) ${app.label} - Checking ${it.label} - Before state:${it.latestState(switch).value}")
                    if (bFan) {
                        if (settings.maxThreshold.toInteger() != null && event.doubleValue >= settings.maxThreshold.toInteger()) {
                            strMsg = 'ON'
                        }
                        if (settings.minThreshold.toInteger() != null && event.doubleValue <= settings.minThreshold.toInteger()) {
                            strMsg = 'OFF'
                        }
                    } else {
                        if (settings.maxThreshold.toInteger() != null && event.doubleValue >= settings.maxThreshold.toInteger()) {
                            strMsg = 'OFF'
                        }
                        if (settings.minThreshold.toInteger() != null && event.doubleValue <= settings.minThreshold.toInteger()) {
                            strMsg = 'ON'
                        }
                    }
                    if (it.latestState('switch').value in ['on', 'ON'] && strMsg == 'OFF' || it.latestState('switch').value in ['off', 'OFF'] && strMsg == 'ON') {
                        strMsg == 'ON' ? it.on() : it.off()
                        log.trace("(0F) ${app.label} turned ${it.label} $strMsg because ${theThermostat.label} is at ${event.doubleValue}° - $bFan")
                        this.sendNotificationEvent("${app.label} turned ${it.label} $strMsg because ${theThermostat.label} is at ${event.doubleValue}°")
                    }
                })
            

	})
