
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('startHubDiscovery', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'onLocation')

    })

    .subscribedEventHandler('onLocation', (context, event) => {
        
                let description = event.description
                let parsedEvent = this.parseLanMessage(description)
                let rawMac = parsedEvent.mac
                let mac = ''
                rawMac.eachWithIndex({ let macChar, let macIndex ->
                    if (macIndex % 2 == 0 && macIndex != 0) {
                        mac += ':'
                    }
                    mac += macChar 
                })
                if (parsedEvent?.ssdpTerm?.contains('urn:schemas-smartwink:device:SmartWink:1')) {
                    this.discoveredHub(parsedEvent)
                } else {
                    if (parsedEvent.headers && parsedEvent.body && parsedEvent.headers['Content-Type']?.contains('json')) {
                        let responseType = parsedEvent.headers['X-Response']
                        log.trace("Got JSON response (X-Response: $responseType) from Wink Hub: ${parsedEvent.body}")
                        let json = new groovy.json.JsonSlurper().parseText(parsedEvent.body)
                        log.trace("Parsed JSON into $json")
                        switch (responseType ? responseType : '') {
                            case 'DEVICE_DISCOVERY':
                                if (state.inDeviceDiscovery) {
                                    console.log("Got JSON data from Wink Hub ($mac): $json")
                                    state.foundDevices[ mac ] = json 
                                } else {
                                    log.info('__name__ received device discovery results, but not in discovery mode. Ignoring.')
                                }
                                break
                            case 'DEVICE_PAIRED':
                                let status = json.status ? json.status : 'unknown'
                                log.info("Got pairing response from Wink Hub: $status")
                                if (state.pairingMode) {
                                    if (status == 'ready') {
                                        log.warn('Ready to pair status when already in pairing mode? Ignoring.')
                                    } else {
                                        state.pairStatus = ((status == 'FLX_OK') as Boolean)
                                        state.pairingMode = false
                                        log.info("Wink Hub pairing completed, status ${state.pairStatus}.")
                                    }
                                } else {
                                    if (status == 'ready') {
                                        log.info('Ready to pair to Wink Hub')
                                        state.pairingMode = true
                                    }
                                }
                                break
                            case 'DEVICE_EVENT':
                                return this.dispatchDeviceEvent(parsedEvent, mac, json)
                            case 'DEVICE_LINKED':
                                json.each({ let serial, let data ->
                                    let controller = this.getChildDevice("$serial")
                                    if (!controller) {
                                        log.warn("Pairing event from unknown __app__ device: ${json.serial}. Full response: $data")
                                    } else {
                                        let added = data.added.collect({ 
                                            this.getChildDevice("$it")?.displayName
                                        }).join(', ')
                                        let removed = data.removed.collect({ 
                                            this.getChildDevice("$it")?.displayName
                                        }).join(', ')
                                        let msg = "${controller.displayName} hard-paired: added [$added], removed [$removed]"
                                        log.info(msg)
                                        this.sendNotificationEvent(msg)
                                    }
                                })
                                break
                            case '':
                                console.log('Empty X-Response, probably not a __name__ message. Ignoring.')
                                break
                            default: 
                            log.warn("Unknown X-Response $responseType (SmartApp and Wink Hub on different __app__ versions?), ignoring.")
                            break
                        }
                    }
                }
                return parsedEvent 
            

	})

    .scheduledEventHandler('startHubDiscovery', (context, event) => {
        
                this.sendHubCommand(new physicalgraph.device.HubAction('lan discovery urn:schemas-smartwink:device:SmartWink:1', physicalgraph.device.Protocol.LAN))
            

	})
