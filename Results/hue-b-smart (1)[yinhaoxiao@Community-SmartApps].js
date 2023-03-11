
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
        
                log.trace("evt = $evt")
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
                console.log("Groups = $groups")
                bridge.value.scenes = scenes 
                bridge.value.schedules = schedules 
                if (state.inItemDiscovery) {
                    state.inItemDiscovery = false
                    state.itemDiscoveryComplete = true
                    bridge.value.itemsDiscovered = true
                }
                let devices = this.getChildDevices()
                log.trace("devices = $devices")
                devices.each({ 
                    log.trace("device = $it")
                    let devId = it.deviceNetworkId
                    if (devId.contains(mac) && devId.contains('/')) {
                        if (it.deviceNetworkId.contains('BULB')) {
                            log.trace("contains BULB / DNI = ${it.deviceNetworkId}: $it")
                            let bulbId = it.deviceNetworkId.split('/')[1] - 'BULB'
                            console.log("bulbId = $bulbId")
                            let bBulb = bridge.value.bulbs[ bulbId ]
                            console.log("bridge.value.bulbs[bulbId] = $bBulb.")
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
                        if (it.deviceNetworkId.contains('GROUP')) {
                            let groupId = it.deviceNetworkId.split('/')[1] - 'GROUP'
                            let g = bridge.value.groups[ groupId ]
                            let groupFromBridge = bridge.value.groups[ groupId ]
                            let gLights = groupFromBridge.lights
                            let test 
                            ['on', 'bri', 'sat', 'ct', 'xy', 'effect', 'hue', 'colormode'].each({ let p ->
                                test = bridge.value.groups[ groupId ].action[ p ]
                                it.updateStatus('action', p, bridge.value.groups[ groupId ].action[ p ])
                            })
                        }
                        if (it.deviceNetworkId.contains('SCENE')) {
                            log.trace("it.deviceNetworkId contains SCENE = ${it.deviceNetworkId}")
                            log.trace("contains SCENE / DNI = ${it.deviceNetworkId}")
                            let sceneId = it.deviceNetworkId.split('/')[1] - 'SCENE'
                            console.log("sceneId = $sceneId")
                            let sceneFromBridge = bridge.value.scenes[ sceneId ]
                            log.trace("sceneFromBridge = $sceneFromBridge")
                            let sceneLights = []
                            sceneLights = sceneFromBridge.lights
                            let scenelightStates = sceneFromBridge.lightStates
                            log.trace("bridge.value.scenes[$sceneId].lights = $sceneLights")
                            log.trace("bridge.value.scenes[$sceneId].lightStates = $scenelightStates")
                            if (bridge.value.scenes[ sceneId ].lights) {
                                it.updateStatus('scene', 'lights', bridge.value.scenes[ sceneId ].lights)
                            }
                            if (scenelightStates) {
                                it.updateStatus('scene', 'lightStates', scenelightStates)
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
        
                state.limitation = inItems 
                console.log("Doing Hue Device Sync!  inItems = $inItems")
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
