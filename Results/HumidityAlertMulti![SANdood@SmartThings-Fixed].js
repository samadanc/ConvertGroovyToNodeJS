
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
                log.trace("humidity: ${event.value}")
                log.trace("set point: $humidityHigh")
                let currentHumidity = Double.parseDouble(event.stringValue.replace('%', ''))
                if (currentHumidity > 100.0) {
                    if (theSwitch) {
                        theSwitch.off()
                        log.info("Humidity at ${event.device.displayName} exceeds 100%: turning off $theSwitch")
                    } else {
                        log.info("Humidity at ${event.device.displayName} exceeds 100%, ignoring")
                    }
                    return null
                }
                let multiHumidity = currentHumidity 
                let humidistat = event.device.displayName
                if (humiditySensors.size() > 1) {
                    switch ( multiMode ) {
                        case 'average':
                            let total = 0
                            humiditySensors.each({ 
                                total += Double.parseDouble(it.currentHumidity.toString().replace('%', ''))
                            })
                            multiHumidity = total / humiditySensors.size()
                            humidistat = 'average'
                            break
                        case 'any-on/all-off':
                            let highest = currentHumidity 
                            humiditySensors.each({ 
                                let val = Double.parseDouble(it.currentHumidity.toString().replace('%', ''))
                                if (val > highest ) {
                                    highest = val 
                                    humidistat = it.displayName
                                }
                            })
                            multiHumidity = highest 
                            break
                        case 'all-on/any-off':
                            let lowest = currentHumidity 
                            humiditySensors.each({ 
                                let val = Double.parseDouble(it.currentHumidity.toString().replace('%', ''))
                                if (val < lowest ) {
                                    lowest = val 
                                    humidistat = it.displayName
                                }
                            })
                            multiHumidity = lowest 
                            break
                        case 'all-on/all-off':
                            let val = Double.parseDouble(it.currentHumidity.replace('%', ''))
                            if (theSwitch.currentSwitch == 'on') {
                                if (val > highest ) {
                                    highest = val 
                                    humidistat = it.displayName
                                }
                                multiHumidity = highest 
                            } else {
                                if (val < lowest ) {
                                    lowest = val 
                                    humidistat = it.displayName
                                }
                                multiHumidity = lowest 
                            }
                            break
                    }
                }
                let deltaMinutes = 10
                let timeAgo = this.now() - 1000 * 60 * deltaMinutes .toLong()
                if (theSwitch.currentSwitch == 'off' && multiHumidity >= humidityHigh ) {
                    console.log("Checking how long the humidity sensor(s) have been reporting >= $humidityHigh")
                    let alreadySentSMS = atomicState.sentSMSHigh >= timeAgo 
                    if (alreadySentSMS) {
                        log.info("ON Notification already sent within the last $deltaMinutes minutes")
                        if (theSwitch?.currentSwitch != 'on') {
                            log.warn("${theSwitch.displayName} should already be on, but it isn't")
                            theSwitch.on()
                        }
                    } else {
                        if (humidistat == 'average') {
                            log.info("Average humidity rose above $humidityHigh, sending SMS and activating ${theSwitch.displayName}")
                            this.send("Average humidity rose to $multiHumidity, activating ${theSwitch.displayName}")
                        } else {
                            console.log("Humidity at $humidistat rose above $humidityHigh: sending SMS and activating ${theSwitch.displayName}")
                            this.send("$humidistat sensed high humidity level of ${event.value}, activating ${theSwitch.displayName}")
                        }
                        theSwitch?.on()
                        atomicState.sentSMSHigh = this.now()
                    }
                } else {
                    if (theSwitch.currentSwitch == 'on' && multiHumidity <= humidityLow ) {
                        console.log("Checking how long the humidity sensor(s) have been reporting <= $humidityLow")
                        let alreadySentSMS = atomicState.sentSMSLow >= timeAgo 
                        if (alreadySentSMS) {
                            console.log("OFF Notification already sent within the last $deltaMinutes minutes")
                            if (theSwitch?.currentSwitch != 'off') {
                                log.warn("${theSwitch.displayName} should already be off, but it isn't")
                                theSwitch.off()
                            }
                        } else {
                            if (humidistat == 'average') {
                                log.info("Average humidity fell below $humidityLow, sending SMS and deactivating ${theSwitch.displayName}")
                                this.send("Average humidity fell to $multiHumidity, deactivating ${theSwitch.displayName}")
                            } else {
                                log.info("Humidity fell below $humidityLow: sending SMS and deactivating ${theSwitch.displayName}")
                                this.send("$humidistat sensed low humidity level of ${event.value}, deactivating ${theSwitch.displayName}")
                            }
                            theSwitch.off()
                            atomicState.sentSMSLow = this.now()
                        }
                    }
                }
            

	})
