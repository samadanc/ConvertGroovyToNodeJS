
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
        
                this.logMessage("evt = $evt", 'trace')
                let bulbs = event.jsonData[0]
                let scenes = event.jsonData[1]
                let groups = event.jsonData[2]
                let schedules = event.jsonData[3]
                let mac = event.jsonData[4]
                let bridge = this.getBridge(mac)
                state.bridge = bridge 
                let host = bridge.value.networkAddress
                host = "${this.convertHexToIP(host)}" + ':80'
                state.host = host 
                let username = state.user
                bridge.value.bulbs = bulbs 
                bridge.value.groups = groups 
                this.logMessage("Groups = $groups", 'info')
                bridge.value.scenes = scenes 
                bridge.value.schedules = schedules 
                if (state.inItemDiscovery) {
                    state.inItemDiscovery = false
                    state.itemDiscoveryComplete = true
                    bridge.value.itemsDiscovered = true
                }
                let devices = this.getChildDevices()
                this.logMessage("devices = $devices", 'info')
                devices.each({ 
                    this.logMessage("device = $it", 'info')
                    let devId = it.deviceNetworkId
                    if (devId.contains(mac) && devId.contains('/')) {
                        if (it.deviceNetworkId.contains('BULB')) {
                            this.logMessage("contains BULB / DNI = ${it.deviceNetworkId}: $it", 'trace')
                            let bulbId = it.deviceNetworkId.split('/')[1] - 'BULB'
                            this.logMessage("bulbId = $bulbId", 'trace')
                            let bBulb = bridge.value.bulbs[ bulbId ]
                            this.logMessage("bridge.value.bulbs[bulbId] = $bBulb", 'trace')
                            if (bBulb != null) {
                                let type = bBulb.type
                                if (type.equalsIgnoreCase('Dimmable light')) {
                                    ['reachable', 'on', 'bri'].each({ let p ->
                                        it.updateStatus('state', p, bridge.value.bulbs[ bulbId ].state[ p ])
                                    })
                                } else {
                                    if (type.equalsIgnoreCase('Color Temperature Light')) {
                                        ['bri', 'ct', 'reachable', 'on'].each({ let p ->
                                            it.updateStatus('state', p, bridge.value.bulbs[ bulbId ].state[ p ])
                                        })
                                    } else {
                                        ['reachable', 'on', 'bri', 'hue', 'sat', 'ct', 'xy', 'effect', 'colormode'].each({ let p ->
                                            it.updateStatus('state', p, bridge.value.bulbs[ bulbId ].state[ p ])
                                        })
                                    }
                                }
                            }
                        }
                        if (it.deviceNetworkId.contains('GROUP')) {
                            let groupId = it.deviceNetworkId.split('/')[1] - 'GROUP'
                            let g = bridge.value.groups[ groupId ]
                            let groupFromBridge = bridge.value.groups[ groupId ]
                            if (groupFromBridge != null) {
                                let gLights = groupFromBridge.lights
                                let test 
                                let colormode = bridge.value.groups[ groupId ]?.action?.colormode
                                if (colormode != null) {
                                    ['on', 'bri', 'sat', 'ct', 'xy', 'effect', 'hue', 'colormode'].each({ let p ->
                                        test = bridge.value.groups[ groupId ].action[ p ]
                                        it.updateStatus('action', p, bridge.value.groups[ groupId ].action[ p ])
                                    })
                                } else {
                                    ['bri', 'on'].each({ let p ->
                                        it.updateStatus('action', p, bridge.value.groups[ groupId ].action[ p ])
                                    })
                                }
                            }
                        }
                        if (it.deviceNetworkId.contains('SCENE')) {
                            this.logMessage("it.deviceNetworkId contains SCENE = ${it.deviceNetworkId}", 'trace')
                            this.logMessage("contains SCENE / DNI = ${it.deviceNetworkId}", 'trace')
                            let sceneId = it.deviceNetworkId.split('/')[1] - 'SCENE'
                            this.logMessage("sceneId = $sceneId", 'trace')
                            let sceneFromBridge = bridge.value.scenes[ sceneId ]
                            this.logMessage("sceneFromBridge = $sceneFromBridge", 'trace')
                            if (sceneFromBridge != null) {
                                let sceneLights = []
                                sceneLights = sceneFromBridge.lights
                                let scenelightStates = sceneFromBridge.lightStates
                                this.logMessage("bridge.value.scenes[$sceneId].lights = $sceneLights", 'trace')
                                this.logMessage("bridge.value.scenes[$sceneId].lightStates = $scenelightStates", 'trace')
                                if (bridge.value.scenes[ sceneId ].lights) {
                                    it.updateStatus('scene', 'lights', bridge.value.scenes[ sceneId ].lights)
                                }
                                if (scenelightStates) {
                                    it.updateStatus('scene', 'lightStates', scenelightStates)
                                }
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
                                        this.logMessage("error: ${body.error[0].description}", 'error')
                                    } else {
                                        this.logMessage("unknown response: $headerString", 'error')
                                        this.logMessage("unknown response: $body", 'error')
                                    }
                                }
                            }
                        }
                    }
                }
            

	})

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                state.limitation = inItems 
                this.logMessage('Doing Hue Device Sync!', 'info')
                state.doingSync = true
                try {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                } 
                catch (let e) {
                } 
                state.linked_bridges.each({ 
                    let bridgeDev = this.getChildDevice(it.value.mac)
                    if (bridgeDev) {
                        bridgeDev.discoverItems(inItems)
                    }
                })
                this.discoverHueBridges()
                state.doingSync = false
            

	})
