
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('pollChildren', delay);

    })

    .scheduledEventHandler('pollChildren', (context, event) => {
        
                log.info('starting pollChildren')
                if (this.isTokenExpired()) {
                    log.info("API token expired at ${atomicState.APITokenExpirationTime}.  Refreshing API Token")
                    this.getAPIToken()
                }
                let devices = atomicState.devices
                let deviceData = this.RefreshDeviceStatus()
                devices.each({ let dev ->
                    try {
                        let deviceid = dev 
                        let devData = deviceData[ deviceid ]
                        let LastReading = devData.lastReading
                        let dni = this.getDeviceDNI(deviceid)
                        let d = this.getChildDevice(dni)
                        let temperature = LastReading.temperature.toInteger()
                        let level = LastReading.tank.toFloat()
                        let lastReadTime = LastReading.time_iso
                        let capacity = devData.capacity
                        let events = [['temperature': temperature ], ['level': level ], ['energy': level ], ['capacity': capacity ], ['lastreading': lastReadTime ]]
                        log.info("Sending events: $events")
                        events.each({ let event ->
                            d.generateEvent(event)
                        })
                        console.log("device data for $deviceid = $devData")
                    } 
                    catch (let e) {
                        log.error("Error while processing events for pollChildren: $e")
                    } 
                })
            

	})
