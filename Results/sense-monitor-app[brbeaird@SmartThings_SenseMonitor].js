
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('reInitDevices', delay);

        context.api.schedules.runEvery5Minutes('notificationCheck', delay);

        context.api.schedules.runIn('senseServiceUpdate', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'null', 'lanEventHandler')

    })

    .subscribedEventHandler('lanEventHandler', (context, event) => {
        
                let msg 
                try {
                    msg = this.parseLanMessage(event.description)
                } 
                catch (let e) {
                    return 1
                } 
                let headerMap = msg?.headers
                if (headerMap != null) {
                    if (headerMap?.source != 'STSense') {
                        return 0
                    }
                    if (headerMap?.source == 'STSense' && headerMap?.senseAppId && headerMap?.senseAppId?.toString() != app?.getId()) {
                        log.warn('STSense Data Recieved but it was meant for a different SmartAppId...')
                        return 0
                    }
                }
                Map result = [:]
                if (msg?.body != null) {
                    try {
                        let slurper = new groovy.json.JsonSlurper()
                        result = ((slurper?.parseText(msg?.body)) as Map)
                    } 
                    catch (let e) {
                        console.log('FYI - got a Sense response, but it\'s apparently not JSON. Error: ' + e + '. Body: ' + msg?.body)
                        return 1
                    } 
                    if (this.checkIfCodeUpdated()) {
                        log.warn('Possible Code Version Update Detected... Device Updates will occur on next cycle.')
                        return 0
                    }
                    Boolean updRequired = false
                    List updRequiredItems = []
                    ['server': 'Sense Server', 'monitorDevice': 'Monitor Device', 'energyDevice': 'Energy Device']?.each({ let k, let v ->
                        Map codeVers = state?.codeVersions
                        if (codeVers && codeVers[(k as String)] && this.versionStr2Int(codeVers[(k as String)]) < this.minVersions()[(k as String)]) {
                            updRequired = true
                            updRequiredItems?.push("$v")
                        }
                    })
                    if (result?.deviceIds) {
                        this.getAllChildDevices().each({ let child ->
                            let devId = child.deviceNetworkId.split('\|')[2]
                            if (devId != 'SenseMonitor' && !(result.deviceIds.contains(devId))) {
                                console.log("Found possible stale Sense device. Checking for recent events: ${child.label} ($devId)")
                                let eventCount = 0
                                let recentEvents = child.eventsSince(new Date() - 7)
                                recentEvents.each({ let event ->
                                    if (event.name != 'DeviceWatch-DeviceStatus') {
                                        eventCount++
                                    }
                                })
                                if (eventCount == 0) {
                                    console.log("No recent events found. Deleting ${child.label} ($devId)")
                                    this.deleteChildDevice(child.deviceNetworkId, true)
                                }
                            }
                        })
                    }
                    if (result?.toggleIds) {
                        result.toggleIds.each({ let toggleDevice ->
                            let dni = [app?.id, 'senseDevice', toggleDevice ].join('|')
                            console.log('toggling ' + dni )
                            let childDevice = this.getChildDevice(dni)
                            childDevice?.toggleOn()
                            childDevice?.toggleOff()
                        })
                    }
                    List ignoreTheseDevs = settings?.senseDeviceFilter ? settings?.senseDeviceFilter : []
                    if (result?.devices) {
                        Map senseDeviceMap = [:]
                        if (state.senseDeviceMap) {
                            senseDeviceMap = state.senseDeviceMap
                        }
                        result?.devices?.each({ let senseDevice ->
                            Boolean isMonitor = senseDevice?.id == 'SenseMonitor'
                            senseDeviceMap[senseDevice?.id] = senseDevice 
                            if (senseDevice?.id in ignoreTheseDevs ) {
                                this.logger('warn', "skipping ${senseDevice?.name} because it is in the do not use list...")
                                return null
                            }
                            let dni = [app?.id, !isMonitor ? 'senseDevice' : 'senseMonitor', senseDevice?.id].join('|')
                            let childDevice = this.getChildDevice(dni)
                            Map childDeviceAttrib = [:]
                            String fullName = !isMonitor ? 'Sense-' + senseDevice?.name : 'Sense Monitor'
                            String childHandlerName = isMonitor ? 'Sense Monitor Device' : 'Sense Energy Device'
                            if (!updRequired) {
                                if (!childDevice) {
                                    console.log('name will be: ' + fullName )
                                    childDeviceAttrib = ['name': childHandlerName , 'label': fullName , 'completedSetup': true]
                                    try {
                                        if (isMonitor) {
                                            console.log('Creating NEW Sense Monitor Device: ' + fullName )
                                            childDevice = this.addChildDevice('brbeaird', 'Sense Monitor Device', dni, null, childDeviceAttrib)
                                        } else {
                                            console.log('Creating NEW Sense Energy Device: ' + fullName )
                                            childDevice = this.addChildDevice('brbeaird', 'Sense Energy Device', dni, null, childDeviceAttrib)
                                        }
                                    } 
                                    catch (physicalgraph.app.exception.UnknownDeviceTypeException ex) {
                                        log.error('AddDevice Error! ', ex)
                                    } 
                                } else {
                                    if (settings?.autoRenameDevices != false && childDevice?.name != childHandlerName || childDevice?.label != fullName ) {
                                        childDevice?.name = childHandlerName 
                                        childDevice?.label = fullName 
                                    }
                                }
                                childDevice?.updateDeviceStatus(senseDevice)
                            }
                            this.modCodeVerMap(isMonitor ? 'monitorDevice' : 'energyDevice', childDevice?.devVersion())
                            state?.lastDevDataUpd = this.getDtNow()
                        })
                        state?.senseDeviceMap = senseDeviceMap 
                    }
                    if (result?.serviceInfo) {
                        Map srvcInfo = result?.serviceInfo
                        state?.nodeServiceInfo = srvcInfo 
                        Boolean sendSetUpd = false
                        if (srvcInfo?.config && srvcInfo?.config?.size()) {
                            srvcInfo?.config?.each({ let k, let v ->
                                if (settings?.containsKey((k as String))) {
                                    if (settings[(k as String)] != v ) {
                                        sendSetUpd = true
                                        console.log("config($k) | Service: $v | App: ${settings[k as String]} | result: ${(srvVal != appVal)} | sendUpdate: $sendSetUpd")
                                    }
                                }
                            })
                        }
                        this.modCodeVerMap('server', srvcInfo?.version)
                        if (sendSetUpd) {
                            this.senseServiceUpdate()
                        }
                    }
                    if (updRequired) {
                        log.error("CODE UPDATES REQUIRED:  Sense Monitor Integration will not function until the following items are ALL Updated $updRequiredItems...")
                        this.appUpdateNotify()
                    }
                }
                return 0
            

	})
