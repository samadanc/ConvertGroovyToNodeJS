
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('conditionHandler', (context, event) => {
        
                let result 
                let cSwitchOk = false
                let cHumOk = false
                let cTempOk = false
                let cModeOk = false
                let cPresenceOk = false
                let cDoorOk = false
                let cWindowOk = false
                let cDaysOk = false
                let cPendAll = false
                let timeOk = false
                let cGarageOk = false
                let devList = []
                let safetyTime = 5
                let cContactWindowMin = 1
                let msg = "The ${settings?.priFan} is being turned off due to your preset conditions having not been met. Please see the House Fan Controller app for more information."
                log.info('Verifying Conditions:')
                if (cSwitch == null) {
                    cSwitchOk = true
                }
                if (cSwitch) {
                    log.trace('Conditions: Switches events method activated')
                    let cSwitchSize = cSwitch?.size()
                    cSwitch.each({ let deviceName ->
                        let status = deviceName.currentValue('switch')
                        if (status == "$cSwitchCmd") {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList?.size()
                    if (!cSwitchAll) {
                        if (devList?.size() > 0) {
                            cSwitchOk = true
                        }
                    }
                    if (cSwitchAll) {
                        if (devListSize == cSwitchSize ) {
                            cSwitchOk = true
                        }
                    }
                    if (cSwitchOk == false) {
                        log.warn('Switches Conditions Handler failed')
                    }
                }
                if (cHumidity == null) {
                    cHumOk = true
                }
                if (cHumidity) {
                    log.trace('Conditions: Humidity events method activated')
                    java.lang.Integer cHumidityStopVal = cHumidityStop == null ? 0 : (cHumidityStop as int)
                    cHumidity.each({ let deviceName ->
                        let status = deviceName.currentValue('humidity')
                        if (cHumidityLevel == 'above') {
                            cHumidityStopVal = cHumidityStopVal == 0 ? 999 : (cHumidityStopVal as int)
                            if (status >= cHumidityPercent && status <= cHumidityStopVal ) {
                                cHumOk = true
                            }
                        }
                        if (cHumidityLevel == 'below') {
                            if (status <= cHumidityPercent && status >= cHumidityStopVal ) {
                                cHumOk = true
                            }
                        }
                    })
                    if (cHumOk == false) {
                        log.warn('Humidity Conditions Handler failed')
                    }
                }
                if (cTemperature == null) {
                    cTempOk = true
                }
                if (cTemperature) {
                    log.trace('Conditions: Temperature events method activated')
                    java.lang.Integer cTemperatureStopVal = cTemperatureStop == null ? 0 : (cTemperatureStop as int)
                    cTemperature.each({ let deviceName ->
                        let status = deviceName.currentValue('temperature')
                        if (cTemperatureLevel == 'above') {
                            cTemperatureStopVal = cTemperatureStopVal == 0 ? 999 : (cTemperatureStopVal as int)
                            if (status >= cTemperatureDegrees && status <= cTemperatureStopVal ) {
                                cTempOk = true
                            }
                        }
                        if (cTemperatureLevel == 'below') {
                            if (status <= cTemperatureDegrees && status >= cTemperatureStopVal ) {
                                cTempOk = true
                            }
                        }
                    })
                    if (cTempOk == false) {
                        log.warn('Temperature Conditions Handler failed')
                    }
                }
                if (cDays == null) {
                    cDaysOk = true
                }
                if (cDays) {
                    log.trace('Conditions: Days of the Week events method activated')
                    let df = new java.text.SimpleDateFormat('EEEE')
                    if (location.timeZone) {
                        df.setTimeZone(location.timeZone)
                    } else {
                        df.setTimeZone(TimeZone.getTimeZone('America/New_York'))
                    }
                    let day = df.format(new Date())
                    if (cDaysOk == false) {
                        log.warn('Days Conditions Handler failed')
                    }
                    result = cDays.contains(day)
                }
                if (cMode == null) {
                    cModeOk = true
                }
                if (cMode) {
                    log.trace('Conditions: Mode events method activated')
                    cModeOk = !cMode || cMode?.contains(location.mode)
                    if (cModeOk == false) {
                        log.warn('Mode Conditions Handler failed')
                    }
                }
                if (cPresence == null) {
                    cPresenceOk = true
                }
                if (cPresence) {
                    log.trace('Conditions: Presence events method activated')
                    let cPresenceSize = cPresence.size()
                    cPresence.each({ let deviceName ->
                        let status = deviceName.currentValue('presence')
                        if (status == cPresenceCmd ) {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList?.size()
                    if (!cPresenceAll) {
                        if (devList?.size() > 0) {
                            cPresenceOk = true
                        }
                    }
                    if (cPresenceAll) {
                        if (devListSize == cPresenceSize ) {
                            cPresenceOk = true
                        }
                    }
                    if (cPresenceOk == false) {
                        log.warn('Presence Conditions Handler failed')
                    }
                }
                if (cContactDoor == null) {
                    cDoorOk = true
                }
                if (cContactDoor) {
                    log.trace('Conditions: Door Contacts events method activated')
                    let cContactDoorSize = cContactDoor?.size()
                    cContactDoor.each({ let deviceName ->
                        let status = deviceName.currentValue('contact')
                        if (status == "$cContactDoorCmd") {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList?.size()
                    if (!cContactDoorAll) {
                        if (devList?.size() > 0) {
                            cDoorOk = true
                        }
                    }
                    if (cContactDoorAll) {
                        if (devListSize == cContactDoorSize ) {
                            cDoorOk = true
                        }
                    }
                    if (cDoorOk == false) {
                        log.warn('Door Contacts Conditions Handler failed')
                    }
                }
                if (cContactWindow == null) {
                    cWindowOk = true
                }
                if (cContactWindow) {
                    log.trace('Conditions: Window Contacts events method activated')
                    let cContactWindowSize = cContactWindow?.size()
                    cContactWindow.each({ let deviceName ->
                        let status = deviceName.currentValue('contact')
                        if (status == 'open') {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList?.size()
                    if (!cContactWindowAll) {
                        if (devListSize >= cContactWindowMin ) {
                            log.info("devListSizedevListSize = $devListSize")
                            cWindowOk = true
                        } else {
                            cWindowOk = false
                            log.warn("Minimum of $cContactWindowMin windows are required to be open, there are ${devList?.size()} windows open")
                        }
                    }
                    if (cContactWindowAll) {
                        if (devListSize == cContactWindowSize ) {
                            cWindowOk = true
                        }
                    }
                    if (cWindowOk == false) {
                        log.warn('Window Contacts Conditions Handler failed')
                    }
                }
                if (cGarage == null) {
                    cGarageOk = true
                }
                if (cGarage) {
                    log.trace('Conditions: Garage Doors events method activated')
                    cGarage.each({ let deviceName ->
                        let status = deviceName.currentValue('door')
                        if (status == "$cGarageCmd") {
                            cGarageOk = true
                        }
                        if (cGarageOk == false) {
                            log.warn('Garage Conditions Handler failed')
                        }
                    })
                }
                if (cGarageOk == true && cTempOk == true && cHumOk == true && cSwitchOk == true && cModeOk == true && cPresenceOk == true && cDoorOk == true && cWindowOk == true && cDaysOk == true && this.getTimeOk(evt) == true) {
                    result = true
                }
                if (result == true) {
                    log.warn('Conditions Verified ==> All Conditions have been met')
                    this.processOnActions()
                } else {
                    log.warn("Conditions Verified ==> All Conditions have NOT been met, ${settings?.priFan} will turn off in 10 seconds.")
                    if (failMsg == null) {
                        this.runIn(10, safetyMethod)
                        this.ttsActions(msg)
                    } else {
                        this.ttsActions(failMsg)
                        this.runIn(10, safetyMethod)
                    }
                }
                return result 
            

	})

    .subscribedEventHandler('processOffActions', (context, event) => {
        
                log.info('Process Off Actions Method activated.')
                let result 
                let devList = []
                let aSwitchSize = settings?.aSwitch?.size()
                if (settings?.aOtherSwitchesOff) {
                    if (settings?.aOtherSwitchesCmdOff == 'on') {
                        settings?.aOtherSwitchesOff?.on()
                    }
                    if (settings?.aOtherSwitchesCmdOff == 'off') {
                        settings?.aOtherSwitchesOff?.off()
                    }
                    if (settings?.aOtherSwitchesCmdOff == 'toggle') {
                        this.toggle2Off()
                    }
                }
                if (aOtherSwitches2Off) {
                    if (settings?.aOtherSwitchesCmd2Off == 'on') {
                        settings?.aOtherSwitches2Off?.on()
                    }
                    if (settings?.aOtherSwitchesCmd2Off == 'off') {
                        settings?.aOtherSwitches2Off?.off()
                    }
                    if (settings?.aOtherSwitchesCmd2Off == 'toggle') {
                        this.toggle3Off()
                    }
                }
                if (settings?.aDimOff) {
                    this.runIn(settings?.aDimDelayOff, dimmersHandlerOff)
                }
                if (settings?.aOtherDimOff) {
                    this.runIn(settings?.otherDimDelayOff, otherDimmersHandlerOff)
                }
                if (settings?.aCeilingFansOff) {
                    if (settings?.aCeilingFansCmdOff == 'on') {
                        settings?.aCeilingFansOff.on()
                    } else {
                        if (settings?.aCeilingFansCmdOff == 'off') {
                            settings?.aCeilingFansOff.off()
                        } else {
                            if (settings?.aCeilingFansCmdOff == 'low') {
                                settings?.aCeilingFansOff.setLevel(33)
                            } else {
                                if (settings?.aCeilingFansCmdOff == 'med') {
                                    settings?.aCeilingFansOff.setLevel(66)
                                } else {
                                    if (settings?.aCeilingFansCmdOff == 'high') {
                                        settings?.aCeilingFansOff.setLevel(99)
                                    }
                                }
                            }
                        }
                    }
                    if (settings?.aCeilingFansCmdOff == 'incr') {
                        let newLevel 
                        settings?.aCeilingFansOff?.each({ let deviceD ->
                            let currLevel = deviceD.latestValue('level')
                            newLevel = aCeilingFansIncrOff 
                            newLevel = newLevel + currLevel 
                            newLevel = newLevel < 0 ? 0 : newLevel > 99 ? 99 : newLevel 
                            deviceD.setLevel(newLevel)
                        })
                    }
                    if (settings?.aCeilingFansCmdOff == 'decr') {
                        let newLevel 
                        settings?.aCeilingFansOff?.each({ let deviceD ->
                            let currLevel = deviceD.latestValue('level')
                            newLevel = aCeilingFansDecrOff 
                            newLevel = currLevel - newLevel 
                            newLevel = newLevel < 0 ? 0 : newLevel > 99 ? 99 : newLevel 
                            deviceD.setLevel(newLevel)
                        })
                    }
                }
                if (settings?.aFansCmdOff == 'on') {
                    this.runIn(settings?.aFansDelayOnOff, aFansOnOff)
                }
                if (settings?.aFansCmdOff == 'off') {
                    this.runIn(settings?.aFansDelayOffOff, aFansOffOff)
                }
                if (settings?.aVentsOff) {
                    if (settings?.sVentsCmdOff == 'on') {
                        settings?.aVentsOff.setLevel(100)
                    } else {
                        if (settings?.aVentsCmdOff == 'off') {
                            settings?.aVentsOff.off()
                        } else {
                            if (settings?.aVentsCmdOff == '25') {
                                settings?.aVentsOff.setLevel(25)
                            } else {
                                if (settings?.aVentsCmdOff == '50') {
                                    settings?.aVentsOff.setLevel(50)
                                } else {
                                    if (settings?.aVentsCmdOff == '75') {
                                        settings?.aVentsOff.setLevel(75)
                                    }
                                }
                            }
                        }
                    }
                }
                if (settings?.aShadesOff) {
                    if (settings?.aShadesCmdOff == 'open') {
                        settings?.aShadesOff.setLevel(100)
                    } else {
                        if (settings?.aShadesCmdOff == 'close') {
                            settings?.aShadesOff.setLevel(0)
                        } else {
                            if (settings?.aShadesCmdOff == '25') {
                                settings?.aShadesOff.setLevel(25)
                            } else {
                                if (settings?.aShadesCmdOff == '50') {
                                    settings?.aShadesOff.setLevel(50)
                                } else {
                                    if (settings?.aShadesCmdOff == '75') {
                                        settings?.aShadesOff.setLevel(75)
                                    }
                                }
                            }
                        }
                    }
                }
                if (settings?.cTstatOff) {
                    this.thermostatsOff()
                }
                if (settings?.cTstat1Off) {
                    this.thermostats1Off()
                }
            

	})

    .subscribedEventHandler('safetyCheck', (context, event) => {
        
                let devList = []
                let safetyCheck = true
                let safetyTime = 2
                let msg = "Hey, The ${settings?.priFan} is being turned off due to there not being adequate ventilation available. Please open some windows and select those " + 'windows in the House Fan Controller app.'
                log.warn('Performing Safety Check by Verifying proper ventilation due to gas appliances present')
                if (settings?.cContactWindow == null) {
                    this.sendPush(msg)
                    this.runIn(safetyTime, safetyMethod)
                    return null
                }
                let cContactWindowSize = settings?.cContactWindow?.size()
                settings?.cContactWindow.each({ let deviceName ->
                    let status = deviceName.currentValue('contact')
                    if (status == 'open') {
                        String device = ((String) deviceName)
                        devList += device 
                    }
                })
                let devListSize = devList?.size()
                if (devListSize == 0 || devListSize == null) {
                    safetyCheck = false
                }
                if (safetyCheck == true) {
                    this.conditionHandler(evt)
                }
                if (safetyCheck == false) {
                    this.runIn(safetyTime, safetyMethod)
                    if (failMsg == null) {
                        this.ttsActions(msg)
                        this.sendPush(msg)
                    } else {
                        this.ttsActions(failMsg)
                    }
                }
            

	})
