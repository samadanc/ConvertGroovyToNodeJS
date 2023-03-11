
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('doDeviceSync', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'locationHandler')

    })

    .subscribedEventHandler('itemDiscoveryHandler', (context, event) => {
        
                let bulbs = event.jsonData[0]
                let scenes = event.jsonData[1]
                let groups = event.jsonData[2]
                let mac = event.jsonData[3]
                let bridge = this.getBridge(mac)
                bridge.value.bulbs = bulbs 
                bridge.value.groups = groups 
                bridge.value.scenes = scenes 
                if (state.inItemDiscovery) {
                    state.inItemDiscovery = false
                    state.itemDiscoveryComplete = true
                    bridge.value.itemsDiscovered = true
                }
                let devices = this.getChildDevices()
                devices.each({ 
                    let devId = it.deviceNetworkId
                    if (devId.contains(mac) && devId.contains('/')) {
                        if (it.deviceNetworkId.contains('BULB')) {
                            let bulbId = it.deviceNetworkId.split('/')[1] - 'BULB'
                            let type = bridge.value.bulbs[ bulbId ].type
                            if (type.equalsIgnoreCase('Dimmable light')) {
                                ['bri', 'reachable', 'on'].each({ let p ->
                                    it.updateStatus('state', p, bridge.value.bulbs[ bulbId ].state[ p ])
                                })
                            } else {
                                ['bri', 'sat', 'reachable', 'hue', 'on'].each({ let p ->
                                    it.updateStatus('state', p, bridge.value.bulbs[ bulbId ].state[ p ])
                                })
                            }
                        }
                    }
                })
            

	})

    .subscribedEventHandler('locationHandler', (context, event) => {
        
                let description = event.description
                let hub = evt?.hubId
                let parsedEvent = this.parseLanMessage(description)
                parsedEvent << ['hub': hub ]
                if (parsedEvent?.ssdpTerm?.contains('urn:schemas-upnp-org:device:basic:1')) {
                    this.processDiscoveryResponse(parsedEvent)
                } else {
                    if (parsedEvent.headers && parsedEvent.body) {
                        let headerString = parsedEvent.headers.toString()
                        if (headerString.contains('xml')) {
                            this.processVerifyResponse(parsedEvent.body)
                        } else {
                            if (headerString?.contains('json')) {
                                let body = new groovy.json.JsonSlurper().parseText(parsedEvent.body)
                                if (body.success != null && body.success[0] != null && body.success[0].username) {
                                    state.params.linkDone = true
                                    state.params.username = body.success[0].username
                                } else {
                                    if (body.error && body.error[0] && body.error[0].description) {
                                        console.log("error: ${body.error[0].description}")
                                    } else {
                                        console.log("unknown response: $headerString")
                                        console.log("unknown response: $body")
                                    }
                                }
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                console.log('Doing Hue Device Sync!')
                state.doingSync = true
                try {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                } 
                catch (let e) {
                } 
                state.linked_bridges.each({ 
                    let bridgeDev = this.getChildDevice(it.value.mac)
                    if (bridgeDev) {
                        bridgeDev.discoverItems()
                    }
                })
                this.discoverHueBridges()
                state.doingSync = false
            

	})
