
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'ssdpTerm.' + this.getURN()', 'locationHandler')

        context.api.schedules.runEvery5Minutes('healthCheck', delay);

    })

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                let description = evt?.description
                this.debug("event: $description")
                let urn = this.getURN()
                let hub = evt?.hubId
                let parsedEvent = this.parseEventMessage(description)
                state.hub = hub 
                if (parsedEvent?.ssdpTerm?.contains(urn)) {
                    if (state.sonoffMacDevices == null) {
                        state.sonoffMacDevices = [:]
                    }
                    let ip = this.convertHexToIP(parsedEvent.ip)
                    state.sonoffMacDevices.put(this.modifyMac(parsedEvent.mac), ip)
                    this.checkSonOff(parsedEvent)
                }
            

	})

    .scheduledEventHandler('healthCheck', (context, event) => {
        
                this.ssdpDiscover()
                let timeout = 1000 * 60 * state.offlineTimeOut
                let curTime = new Date().getTime()
                let devices = this.searchDevicesType('Sonoff CSE7766 Switch')
                devices.each({ 
                    if (timeout > 0) {
                        let mac = it.getDeviceNetworkId()
                        let ip = state.sonoffMacDevices.get(mac)
                        let activeDate = state.sonoffDevicesTimes.get(mac)
                        if (curTime - timeout > activeDate ) {
                            it.markDeviceOffline()
                            this.debug("ip $ip offline ${(curTime - timeout)} > $activeDate ")
                        } else {
                            it.markDeviceOnline()
                            this.debug("ip $ip online ${(curTime - timeout)} < $activeDate ")
                        }
                    } else {
                        it.markDeviceOnline()
                    }
                })
            

	})
