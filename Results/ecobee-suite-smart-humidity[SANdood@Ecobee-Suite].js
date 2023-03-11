
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'forecastChangeHandler')

    })

    .subscribedEventHandler('forecastChangeHandler', (context, event) => {
        
                if (settings.tempDisable == true) {
                    this.LOG("${atomicState.appDisplayName} is temporarily disabled, event ${event.name} ignored", 1, null, 'warn')
                    return true
                }
                let version = this.getVersionLabel()
                if (atomicState.versionLabel != version ) {
                    this.LOG("Code updated: $version", 1, null, 'warn')
                    atomicState.versionLabel = version 
                    this.runIn(2, updated, ['overwrite': true])
                    return null
                }
                if (evt && event.name == 'humidity' && !infoOff) {
                    this.LOG("Humidity changed to ${event.value}%", 3, null, 'info')
                    return null
                }
                java.lang.Boolean isOK = this.isOkNow()
                if (isOK) {
                    switch (evt?.name) {
                        case 'weatherTempLowForecast':
                            if (!infoOff) {
                                this.LOG("Low Temperature Forecast changed to ${event.value} (°F), recalculating setpoint", 3, null, 'info')
                            }
                            break
                        case 'temperature':
                            if (event.numberValue != null) {
                                let d = event.unit == 'F' ? 0 : 1
                                let cTemp = this.roundIt(event.numberValue, d)
                                if (atomicState.lastTemp != null && atomicState.lastTemp == cTemp ) {
                                    return null
                                }
                                if (!infoOff) {
                                    this.LOG("Temperature changed to $cTemp°${event.unit}, recalculating setpoint", 3, null, 'info')
                                }
                                atomicState.lastTemp = cTemp 
                            }
                            break
                        default: 
                        if (!debugOff) {
                            this.LOG("${event.name}: ${event.value} (${event.unit}), recalculating setpoint", 3, null, 'debug')
                        }
                    }
                    this.runIn(3, delayedUpdate, ['overwrite': true])
                } else {
                    if (!debugOff) {
                        this.LOG("Skipping event ${event.name}: ${event.value} ${(event.unit) ? ((( + event.unit) + ) ) : }because of Conditions", 3, null, 'debug')
                    }
                }
            

	})
