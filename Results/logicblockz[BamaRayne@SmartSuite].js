
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'routineHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'shmModeChange')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('routingMethod', (context, event) => {
        
                if (parent.debug) {
                    log.info('Routing Method has been activated')
                }
                if (this.conditionHandler() == true && this.getTimeOk() == true) {
                    state.eDev = "${event.displayName}"
                    state.eAct = "${event.value}"
                    if (parent.trace) {
                        log.trace("Routing Method Rcvd ==> evtValue == ${event.value} && event.displayName == ${event.displayName} && state.stRoutEvent == ${state.stRoutEvent}")
                    }
                    if ("${evt?.displayName}" == "${state.stRoutEvent}" || "${evt?.value}" == "$tContactCmd" || "${evt?.value}" == "$tContactWindowCmd" || "${evt?.value}" == "$tContactDoorCmd" || "${evt?.value}" == "$tSwitchCmd" || "${evt?.value}" == "$tContactCmd" || "${evt?.value}" == "$tLocksCmd" || "${evt?.value}" == "$tMotionCmd" || "${evt?.value}" == "$tPresenceCmd" || "${evt?.value}" == "$tDimCmd" || "${evt?.value}" == "$tGarageCmd" || "${evt?.value}" == "$tKeyCode") {
                        if (parent.trace) {
                            log.trace('The event is being routed to Devices Begin methods for actions processing')
                        }
                        this.devicesBeginActions(evt)
                    }
                    if ("${evt?.displayName}" != "${state.stRoutEvent}" && "${evt?.value}" != "$tContactCmd" && "${evt?.value}" != "$tContactWindowCmd" && "${evt?.value}" != "$tContactDoorCmd" && "${evt?.value}" != "$tSwitchCmd" && "${evt?.value}" != "$tContactCmd" && "${evt?.value}" != "$tLocksCmd" && "${evt?.value}" != "$tMotionCmd" && "${evt?.value}" != "$tPresenceCmd" && "${evt?.value}" != "$tDimCmd" && "${evt?.value}" != "$tGarageCmd" && "${evt?.value}" != "$tKeyCode") {
                        if (parent.trace) {
                            log.trace('The event is being routed to Devices End method to cancel pending events')
                        }
                        this.devicesEndActions(evt)
                    }
                }
            

	})

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Sunset Handler activated')
                }
                let sunsetString = ((String) event.value)
                let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': startSunriseOffset , 'sunsetOffset': startSunsetOffset ])
                let sunsetTime = s.sunset.time
                if (offset) {
                    let offsetSunset = new Date(sunsetTime - -offset * 60 * 1000)
                    if (parent.trace) {
                        console.log("Scheduling for: $offsetSunset (sunset is $sunsetTime)")
                    }
                    this.runOnce(offsetSunset, 'processActions')
                } else {
                    this.processActions('sunset')
                }
            

	})

    .subscribedEventHandler('luxHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Lux Handler activated')
                }
                let data = [:]
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                let luxAVG = tLux ? this.getAverage(tLux, 'illuminance') : 'undefined device'
                let cycleLhigh = state.cycleLh
                let cycleLlow = state.cycleLl
                let currentLux = luxAVG 
                if (tLux) {
                    if (currentLux >= tLuxLow && currentLux <= tLuxHigh ) {
                        if (luxOnce) {
                            if (cycleLhigh == false) {
                                if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                    state.cycleLh = true
                                    if (parent.trace) {
                                        log.trace("sending notification (above): as lux level $currentLux is between $luxLow and $luxHigh")
                                    }
                                    this.processActions(evt)
                                    this.schedule('0 0 0 * * ?', resetLuxVariables)
                                }
                            }
                        } else {
                            this.processActions(evt)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('shmModeChange', (context, event) => {
        
                if (parent.debug) {
                    log.info('shmModeChange method activated.')
                }
                if ("${event.value}" == tSHM ) {
                    this.processActions(evt)
                }
            

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
                let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': startSunriseOffset , 'sunsetOffset': startSunsetOffset ])
                let sunriseTime = s.sunrise.time
                if (offset) {
                    let offsetSunrise = new Date(sunriseTime - -offset * 60 * 1000)
                    if (parent.trace) {
                        console.log("Scheduling for: $offsetSunrise (sunrise is $sunriseTime)")
                    }
                    this.runOnce(offsetSunrise, 'processActions')
                } else {
                    this.processActions('sunrise')
                }
            

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Humidity Handler activated')
                }
                let data = [:]
                let eVal = event.value
                eVal = (eVal as int)
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                if (tHumidityLevel == 'above') {
                    if (eVal >= tHumidityPercent ) {
                        if (humOnce) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.cycleHh == false) {
                                    state.cycleHh = true
                                    this.processActions(evt)
                                    this.schedule('0 0 0 * * ?', resetHumVariables)
                                }
                            }
                        }
                        this.processActions(evt)
                    }
                } else {
                    if (tHumidityLevel == 'below') {
                        if (eVal <= tHumidityPercent ) {
                            if (humOnce) {
                                if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                    if (state.cycleHl == false) {
                                        state.cycleHl = true
                                        this.processActions(evt)
                                        this.schedule('0 0 0 * * ?', resetHumVariables)
                                    }
                                }
                            } else {
                                this.processActions(evt)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('codeEntryHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Keypad Code Entry Handler activated')
                }
                let codeEntered = (event.value as String)
                let data = (event.data as String)
                let stamp = state.lastTime = new Date(this.now()).format('h:mm aa, dd-MMMM-yyyy', location.timeZone)
                let exBtn 
                if (data == '0') {
                    exBtn = 'off'
                }
                if (data == '1') {
                    exBtn = 'partial'
                }
                if (data == '3') {
                    exBtn = 'on'
                }
                if ("$codeEntered" == "$tKeyCode") {
                    if ("$tKeyButton" == "$exBtn") {
                        this.pendSwitches(evt)
                    }
                }
            

	})

    .subscribedEventHandler('CO2Handler', (context, event) => {
        
                if (parent.debug) {
                    log.info('CO2 Handler activated')
                }
                let data = [:]
                let eVal = event.value
                eVal = (eVal as int)
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                let CO2AVG = myCO2 ? this.getAverage(myCO2, 'carbonDioxide') : 'undefined device'
                if (parent.trace) {
                    log.trace("The CO2 average is: $CO2AVG")
                }
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                if (myCO2S == 'above') {
                    if (CO2AVG >= CO2 ) {
                        if (CO2Once) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.cycleCO2h == false) {
                                    state.cycleCO2h = true
                                    this.processActions(evt)
                                    this.schedule('0 0 0 * * ?', resetCO2Variables)
                                }
                            }
                        }
                        this.processActions(evt)
                    }
                }
                if (myCO2S == 'below') {
                    if (CO2AVG <= CO2 || "$CO2AVG" <= "$CO2") {
                        if (CO2Once) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.cycleCO2l == false) {
                                    state.cycleCO2l = true
                                    this.processActions(evt)
                                    this.schedule('0 0 0 * * ?', resetCO2Variables)
                                }
                            }
                        } else {
                            this.processActions(evt)
                        }
                    }
                }
            

	})

    .subscribedEventHandler('processActions', (context, event) => {
        
                if (!parent.debug) {
                    log.info('LogicRulz: Your User Friendly Rule Engine, The Developers of LogicRulz appreciate that you have chosen it to satisfy your SmartThings needs. \n' + 'If you have any questions, concerns, or issues, please contact the Developers on the ST community forum at  https://community.smartthings.com')
                }
                if (parent.aPause == false) {
                    log.warn('All Logic Blocks have been paused by the parent app')
                }
                if (parent.debug) {
                    log.info('Process Actions Method activated.')
                }
                if (this.conditionHandler() == true && this.getTimeOk() == true) {
                    if (remindRProfile) {
                        this.sendToRemindR(evt)
                    }
                    let result 
                    let devList = []
                    let aSwitchSize = aSwitch?.size()
                    if (modeDimmers) {
                        this.dimModes()
                    }
                    if (aOtherSwitches) {
                        if (aOtherSwitchesCmd == 'on') {
                            aOtherSwitches?.on()
                        }
                        if (aOtherSwitchesCmd == 'off') {
                            aOtherSwitches?.off()
                        }
                        if (aOtherSwitchesCmd == 'toggle') {
                            this.toggle2()
                        }
                    }
                    if (aOtherSwitches2) {
                        if (aOtherSwitchesCmd2 == 'on') {
                            aOtherSwitches2?.on()
                        }
                        if (aOtherSwitchesCmd2 == 'off') {
                            aOtherSwitches2?.off()
                        }
                        if (aOtherSwitchesCmd2 == 'toggle') {
                            this.toggle3()
                        }
                    }
                    if (aDim) {
                        this.runIn(aDimDelay, dimmersHandler)
                    }
                    if (aOtherDim) {
                        this.runIn(otherDimDelay, otherDimmersHandler)
                    }
                    if (aHues) {
                        this.runIn(aHuesColorDelay, HuesColorHandler)
                    }
                    if (aHuesOther) {
                        this.runIn(aHuesOtherColorDelay, HuesOtherColorHandler)
                    }
                    if (aSwitchesOn) {
                        state.aSwitchesOnFlag == true
                        this.aSwitchesContact(evt)
                    }
                    if (aSwitchesOff) {
                        state.aSwitchesOffFlag == true
                        this.aSwitchesContact(evt)
                    }
                    if (aCeilingFans) {
                        if (aCeilingFansCmd == 'on') {
                            aCeilingFans.on()
                        } else {
                            if (aCeilingFansCmd == 'off') {
                                aCeilingFans.off()
                            } else {
                                if (aCeilingFansCmd == 'low') {
                                    aCeilingFans.setLevel(33)
                                } else {
                                    if (aCeilingFansCmd == 'med') {
                                        aCeilingFans.setLevel(66)
                                    } else {
                                        if (aCeilingFansCmd == 'high') {
                                            aCeilingFans.setLevel(99)
                                        }
                                    }
                                }
                            }
                        }
                        if (aCeilingFansCmd == 'incr' && aCeilingFans ) {
                            let newLevel 
                            aCeilingFans?.each({ let deviceD ->
                                let currLevel = deviceD.latestValue('level')
                                newLevel = aCeilingFansIncr 
                                newLevel = newLevel + currLevel 
                                newLevel = newLevel < 0 ? 0 : newLevel > 99 ? 99 : newLevel 
                                deviceD.setLevel(newLevel)
                            })
                        }
                        if (aCeilingFansCmd == 'decr' && aCeilingFans ) {
                            let newLevel 
                            aCeilingFans?.each({ let deviceD ->
                                let currLevel = deviceD.latestValue('level')
                                newLevel = aCeilingFansDecr 
                                newLevel = currLevel - newLevel 
                                newLevel = newLevel < 0 ? 0 : newLevel > 99 ? 99 : newLevel 
                                deviceD.setLevel(newLevel)
                            })
                        }
                    }
                    if (aFansCmd == 'on') {
                        this.runIn(aFansDelayOn, aFansOn)
                    }
                    if (aFansCmd == 'off') {
                        this.runIn(aFansDelayOff, aFansOff)
                    }
                    if (aLocksCmd == 'lock') {
                        this.runIn(aLocksDelayLock, aLocksOpen)
                    }
                    if (aLocksCmd == 'unlock') {
                        this.runIn(aLocksDelayUnlock, aLocksClose)
                    }
                    if (aDoorCmd == 'open') {
                        this.runIn(aDoorDelayOpen, aDoorOpen)
                    }
                    if (aDoorCmd == 'close') {
                        this.runIn(aDoorDelayClose, aDoorClose)
                    }
                    if (aPresence) {
                        if (aPresenceCmd == 'arrived') {
                            aPresence.arrived()
                        } else {
                            if (aPresenceCmd == 'departed') {
                                aPresence.departed()
                            }
                        }
                    }
                    if (aVents) {
                        if (sVentsCmd == 'on') {
                            aVents.setLevel(100)
                        } else {
                            if (aVentsCmd == 'off') {
                                aVents.off()
                            } else {
                                if (aVentsCmd == '25') {
                                    aVents.setLevel(25)
                                } else {
                                    if (aVentsCmd == '50') {
                                        aVents.setLevel(50)
                                    } else {
                                        if (aVentsCmd == '75') {
                                            aVents.setLevel(75)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (aShades) {
                        if (aShadesCmd == 'open') {
                            aShades.setLevel(100)
                        } else {
                            if (aShadesCmd == 'close') {
                                aShades.setLevel(0)
                            } else {
                                if (aShadesCmd == '25') {
                                    aShades.setLevel(25)
                                } else {
                                    if (aShadesCmd == '50') {
                                        aShades.setLevel(50)
                                    } else {
                                        if (aShadesCmd == '75') {
                                            aShades.setLevel(75)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (aSHM == 'away') {
                        let data = 3
                        this.sendSHMEvent('away', data)
                    }
                    if (aSHM == 'home') {
                        let data = 1
                        this.sendSHMEvent('stay', data)
                    }
                    if (aSHM == 'disarmed') {
                        let data = 0
                        this.sendSHMEvent('off', data)
                    }
                    if (cTstat) {
                        this.thermostats()
                    }
                    if (cTstat1) {
                        this.thermostats1()
                    }
                    if (aMode) {
                        this.setLocationMode(aMode)
                    }
                    if (tSelf) {
                        if (tSelfPend) {
                            this.runIn(tSelfDelay, tSelfHandler)
                        }
                        if (!tSelfPend) {
                            this.runIn(tSelfDelay, tSelfHandler)
                        }
                    }
                    if (message != null) {
                        let Message = this.runProfile(message, evt)
                        this.ttsActions(Message)
                    }
                    if (aSwitches) {
                        this.aSwitchesContact(evt)
                    }
                    if (smc) {
                        this.sendToSMC(evt)
                    }
                    if (aPendSwitches) {
                        if (event.value == "$tMotionCmd") {
                            state.pendCancelOnFlag = true
                            if (pendDelayOn != null) {
                                this.runIn(pendDelayOn, pendSwitchesOnHandler)
                            } else {
                                this.runIn(pendDelayOn, pendSwitchesOnHandler)
                            }
                        }
                    }
                    if (aSwitchesOn) {
                        if (!aSwitchesOnPend) {
                            this.runIn(aSwitchesOnDelay, momentaryDeviceHandlerOn)
                        }
                        if (aSwitchesOnPend) {
                            state.aSwitchesOnCancelFlag = true
                            this.runIn(aSwitchesOnDelay, momentaryDeviceHandlerOn)
                        }
                    }
                    if (aSwitchesOff) {
                        if (!aSwitchesOffPend) {
                            this.runIn(aSwitchesOffDelay, momentaryDeviceHandlerOff)
                        }
                        if (aSwitchesOffPend) {
                            state.aSwitchesOffCancelFlag = true
                            this.runIn(aSwitchesOffDelay, momentaryDeviceHandlerOff)
                        }
                    }
                    if (aRout1) {
                        state.pendRout1CancelOnFlag = true
                        this.runIn(aRoutDelay1, aRout1Handler)
                    }
                    if (aRout2) {
                        state.pendRout2CancelOnFlag = true
                        this.runIn(aRoutDelay2, aRout2Handler)
                    }
                }
            

	})

    .subscribedEventHandler('routineHandler', (context, event) => {
        
                let eDisplayN = event.displayName
                let eName = event.name
                if (parent.debug) {
                    log.info('The ST Routines Execution Events Handler has been activated')
                }
                if (eName == 'routineExecuted' && tRoutine ) {
                    tRoutine?.find({ let r ->
                        let rMatch = r.replaceAll('[^a-zA-Z0-9 ]', '')
                        if (parent.trace) {
                            log.trace(" r = $r && eDisplayN = $eDisplayN")
                        }
                        if (r == eDisplayN ) {
                            state.stRoutEvent = "$eDisplayN"
                            this.processActions(evt)
                        }
                    })
                }
            

	})

    .subscribedEventHandler('windHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Wind Handler activated')
                }
                let data = [:]
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                if (tWindLevel == 'above') {
                    if ("$eVal" >= 0 || "$eVal" >= 0.00 || "$eVal" >= 0.000 || "$eVal" >= 0.0000) {
                        if (windOnce) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.cycleWh == false) {
                                    state.cycleWh = true
                                    this.processActions(evt)
                                    this.schedule('0 0 0 * * ?', resetWindVariables)
                                }
                            }
                        }
                        this.processActions(evt)
                    }
                } else {
                    if (tWindLevel == 'below') {
                        if ("$eVal" <= tWindSpeed ) {
                            if (windOnce) {
                                if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                    if (state.cycleWl == false) {
                                        state.cycleWl = true
                                        this.processActions(evt)
                                        this.schedule('0 0 0 * * ?', resetWindVariables)
                                    }
                                }
                            } else {
                                this.processActions(evt)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Temperature Handler activated')
                }
                let data = [:]
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                let tempAVG = tTemperature ? this.getAverage(tTemperature, 'temperature') : 'undefined device'
                let cycleThigh = state.cycleTh
                let cycleTlow = state.cycleTl
                let currentTemp = tempAVG 
                if (tTemperature) {
                    if (tTempRead == 'between') {
                        if (currentTemp >= tempLow && currentTemp <= tempHigh ) {
                            if (tempOnce) {
                                if (cycleThigh == false) {
                                    if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                        state.cycleTh = true
                                        this.processActions(evt)
                                        this.schedule('0 0 0 * * ?', resetTempVariables)
                                    }
                                }
                            } else {
                                this.processActions(evt)
                            }
                        }
                    }
                    if (tTempRead == 'above') {
                        if (currentTemp > tempHigh ) {
                            if (tempOnce) {
                                if (cycleThigh == false) {
                                    if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                        state.cycleTh = true
                                        this.processActions(evt)
                                        this.schedule('0 0 0 * * ?', resetTempVariables)
                                    }
                                }
                            } else {
                                this.processActions(evt)
                            }
                        }
                    }
                    if (tTempRead == 'below') {
                        if (currentTemp < tempLow ) {
                            if (tempOnce) {
                                if (cycleThigh == false) {
                                    if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                        state.cycleTh = true
                                        this.processActions(evt)
                                        this.schedule('0 0 0 * * ?', resetTempVariables)
                                    }
                                }
                            } else {
                                this.processActions(evt)
                            }
                        }
                    }
                }
            

	})

    .subscribedEventHandler('rainHandler', (context, event) => {
        
                if (parent.debug) {
                    log.info('Rain Handler activated')
                }
                let data = [:]
                let eVal = event.value
                let eName = event.name
                let eDev = event.device
                let eDisplayN = event.displayName
                if (eDisplayN == null) {
                    eDisplayN = eDev 
                }
                if (tRain) {
                    if (tRainAction == 'begins') {
                        if ("$eVal" > 0) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.rainStart == true && state.rainStop == false) {
                                    state.rainStart = false
                                    state.rainStop = true
                                    let Message = "$rainStartMsg"
                                    if (parent.trace) {
                                        log.trace("the rainStart message is: $Message")
                                    }
                                    this.processActions(evt)
                                    this.ttsActions(Message)
                                    this.schedule('0 0 0 * * ?', resetRainVariables)
                                }
                            }
                        }
                    }
                    if (tRainAction == 'ends') {
                        if ("$eVal" == 0.00 || "$eVal" == 0 || "$eVal" == 0.0 || "$eVal" == 0.000 || "$eVal" == 0.0000 || "$eVal" == 0.00000) {
                            if (state.rainStart == false && state.rainStop == true) {
                                if (parent.trace) {
                                    log.trace('sending notification (Rain Ended): as rain has ended')
                                }
                                state.rainStart = true
                                state.rainStop = false
                                let Message = "$rainStopMsg"
                                if (parent.trace) {
                                    log.trace("the rainstop message is: $Message")
                                }
                                this.processActions(evt)
                                this.ttsActions(Message)
                                this.schedule('0 0 0 * * ?', resetRainVariables)
                            }
                        }
                    }
                    if (tRainAction == 'begins and ends') {
                        if ("$eVal" > 0) {
                            if (this.conditionHandler() == true && this.getTimeOk() == true) {
                                if (state.rainStart == true && state.rainStop == false) {
                                    if (parent.trace) {
                                        log.trace('sending notification (/both/Rain Started): as rain has begun')
                                    }
                                    let Message = "$rainStartMsg"
                                    if (parent.trace) {
                                        log.trace("the rainStart message is: $Message")
                                    }
                                    this.processActions(evt)
                                    this.ttsActions(Message)
                                    this.schedule('0 0 0 * * ?', resetRainVariables)
                                    state.rainStart = false
                                    state.rainStop = true
                                }
                            }
                        }
                        if ("$eVal" == 0 || "$eVal" == 0.0 || "$eVal" == 0.000 || "$eVal" == 0.0000 || "$eVal" == 0.00000) {
                            if (state.rainStart == false && state.rainStop == true) {
                                if (parent.trace) {
                                    log.trace('sending notification (/both/Rain Ended): as rain has ended')
                                }
                                let Message = "$rainStopMsg"
                                if (parent.trace) {
                                    log.trace("the rainstop message is: $Message")
                                }
                                this.processActions(evt)
                                this.ttsActions(Message)
                                this.schedule('0 0 0 * * ?', resetRainVariables)
                                state.rainStart = true
                                state.rainStop = false
                            }
                        }
                    }
                }
            

	})
