
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

        context.api.schedules.runIn('purgeUninstalledDeviceData', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                if (!state.authToken) {
                    log.info('poll failed due to authToken=null')
                    let notificationMessage = 'is disconnected from SmartThings, because the access credential changed or was lost. Please go to the Ecobee (Connect) Linked Service and re-enter your account login credentials.'
                    this.sendPushAndFeeds(notificationMessage)
                    this.markChildrenOffline(true)
                    this.unschedule()
                    this.unsubscribe()
                    return null
                }
                let isThermostatPolled = !(thermostats || ecobeesensors )
                let isSwitchesPolled = !ecobeeswitches
                let pollAttempt = 1
                let remoteSensors = state.remoteSensors2 ? state.remoteSensors2 : [:]
                let thermostatList = state.thermostats ? state.thermostats : [:]
                let switchList = state.switchList ? state.switchList : [:]
                remoteSensors.each({ let rdni, let sensor ->
                    sensor.deviceAlive = false
                    sensor.polled = false
                })
                thermostatList.each({ let dni, let stat ->
                    stat.polled = false
                    stat.data = stat.data ? stat.data << ['deviceAlive': false] : ['deviceAlive': false]
                })
                switchList.each({ let sdni, let sw ->
                    sw.deviceAlive = false
                    sw.polled = false
                })
                state.remoteSensors2 = remoteSensors 
                state.thermostats = thermostatList 
                state.switchList = switchList 
                while (!(isThermostatPolled && isSwitchesPolled ) && pollAttempt < 3) {
                    try {
                        if (!isThermostatPolled) {
                            let requestBody = ['selection': ['selectionType': 'registered', 'selectionMatch': '', 'includeExtendedRuntime': true, 'includeSettings': true, 'includeRuntime': true, 'includeSensors': true]]
                            let pollParams = ['uri': apiEndpoint , 'path': '/1/thermostat', 'headers': ['Content-Type': 'text/json', 'Authorization': "Bearer ${state.authToken}"], 'query': ['format': 'json', 'body': this.toJson(requestBody)]]
                            this.httpGet(pollParams, { let resp ->
                                isThermostatPolled = true
                                if (resp.status == 200) {
                                    this.storeThermostatData(resp.data.thermostatList)
                                    if (ecobeesensors) {
                                        this.updateSensorData(resp.data.thermostatList.remoteSensors)
                                    }
                                }
                            })
                        }
                        if (!isSwitchesPolled) {
                            let switchListParams = ['uri': apiEndpoint + '/ea/devices', 'headers': ['Content-Type': 'application/json;charset=UTF-8', 'Authorization': "Bearer ${state.authToken}"]]
                            this.httpGet(switchListParams, { let resp ->
                                isSwitchesPolled = true
                                if (resp.status == 200) {
                                    this.updateSwitches(resp.data?.devices)
                                } else {
                                    log.warn('Unable to get switch device list!')
                                }
                            })
                        }
                    } 
                    catch (groovyx.net.http.HttpResponseException e) {
                        log.info("HttpResponseException $e, ${e?.getStatusCode()} polling ecobee pollAttempt:$pollAttempt, " + "isThermostatPolled:$isThermostatPolled, isSwitchesPolled:$isSwitchesPolled, ${e?.response?.data}")
                        if (e?.getStatusCode() == 401 || e?.response?.data?.status?.code == 14) {
                            pollAttempt++
                            if (pollAttempt > 2 || !(this.refreshAuthToken())) {
                                pollAttempt = 3
                                log.error('Ecobee poll failed despite refreshing authToken')
                            }
                        } else {
                            log.error('Ecobee poll failed for other reason than expired authToken')
                            pollAttempt = 3
                        }
                    } 
                    catch (Exception e) {
                        log.error("Unhandled exception $e in ecobee polling pollAttempt:$pollAttempt, " + "isThermostatPolled:$isThermostatPolled, isSwitchesPolled:$isSwitchesPolled")
                        pollAttempt = 3
                    } 
                }
                this.markChildrenOffline()
                log.trace("poll exit pollAttempt:$pollAttempt, isThermostatPolled:$isThermostatPolled, " + "isSwitchesPolled:$isSwitchesPolled")
            

	})

    .scheduledEventHandler('purgeUninstalledDeviceData', (context, event) => {
        
                let thermostatList = state.thermostats ? state.thermostats : [:]
                let remoteSensors = state.remoteSensors2 ? state.remoteSensors2 : [:]
                let switchList = state.switchList ? state.switchList : [:]
                thermostatList.keySet().removeAll(thermostatList.keySet() - thermostats )
                remoteSensors.keySet().removeAll(remoteSensors.keySet() - ecobeesensors )
                switchList.keySet().removeAll(switchList.keySet() - ecobeeswitches )
                state.thermostats = thermostatList 
                state.remoteSensors2 = remoteSensors 
                state.switchList = switchList 
            

	})
