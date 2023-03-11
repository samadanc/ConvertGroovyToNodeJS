
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'keypadModeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'verify_version')

    })

    .subscribedEventHandler('keypadModeHandler', (context, event) => {
        
                if (globalDisable) {
                    return false
                }
                let theMode = event.value
                let theStatus = false
                if (globalFixMode) {
                    let it = this.findChildAppByName('SHM Delay ModeFix')
                    if (it?.getInstallationState() != 'COMPLETE') {
                        console.log('keypadModeHandler: Modefix is not fully installed, please adjust data then save')
                    } else {
                        if (it.offDefault == theMode ) {
                            theStatus = 'off'
                            theMode = 'Home'
                        } else {
                            if (it.awayDefault == theMode ) {
                                theStatus = 'away'
                                theMode = 'Away'
                            } else {
                                if (it.offModes.contains(theMode)) {
                                    theStatus = 'off'
                                    theMode = 'Home'
                                } else {
                                    if (it.awayModes.contains(theMode)) {
                                        theStatus = 'away'
                                        theMode = 'Away'
                                    } else {
                                        if (it.stayModes.contains(theMode)) {
                                            theStatus = 'stay'
                                            if (it."stayLight$theMode") {
                                                theMode = it."stayLight$theMode"
                                            } else {
                                                theMode = 'Night'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                console.log("keypadModeHandler GlobalFix:$globalFixMode theMode: $theMode theStatus: $theStatus")
                if (globalKeypadControl) {
                    if (theMode == 'Home' || theMode == 'Away' || theMode == 'Night' || theMode == 'Stay') {
                        let kMap = atomicState.kMap
                        let kDtim = this.now()
                        let kMode 
                        console.log("keypadModeHandler KeypadControl entered theMode: $theMode AtomicState.kMap: $kMap")
                        let setKeypadLights = true
                        if (kMap) {
                            kDtim = kMap.dtim
                            kMode = kMap.mode
                            if (theMode == kMode ) {
                                console.log('Keypad lights are OK, no messages sent')
                                setKeypadLights = false
                            }
                        }
                        if (setKeypadLights) {
                            kMap = ['mode': theMode , 'dtim': kDtim ]
                            atomicState.kMap = kMap 
                            console.log("keypadModeHandler issuing keypadlightHandler $evt ${event.value}")
                            this.keypadLightHandler(evt)
                        }
                    } else {
                        console.log("keypadModeHandler mode $theMode cannot be used to set the keypad lights")
                    }
                }
                if (theStatus) {
                    let alarm = location.currentState('alarmSystemStatus')
                    let alarmstatus = alarm.value
                    if (alarmstatus != theStatus ) {
                        this.setSHM(theStatus)
                    }
                }
                this.qsse_status_mode(theStatus, theMode)
            

	})

    .subscribedEventHandler('verify_version', (context, event) => {
        
                let uri = 'https://www.arnb.org/shmdelay/'
                uri += '?hub=' + location.hubs[0].encodeAsBase64()
                uri += '&zip=' + location.zipCode
                uri += '&cnty=' + location.country
                uri += '&eui=' + location.hubs[0].zigbeeEui
                let childApps = this.getChildApps()
                let vdelay = this.version()
                let vchild = ''
                let vmodefix = ''
                let vuser = ''
                let vkpad = ''
                let vtalk = ''
                childApps.find({ 
                    if (vchild > '' && vmodefix > '' && vuser > '' && vkpad > '' && vtalk > '') {
                        return true
                    } else {
                        if (it.getName() == 'SHM Delay Child') {
                            if (vchild == '') {
                                vchild = it?.version()
                            }
                            return false
                        } else {
                            if (it.getName() == 'SHM Delay ModeFix') {
                                vmodefix = it?.version()
                                return false
                            } else {
                                if (it.getName() == 'SHM Delay Simkypd Child') {
                                    if (vkpad == '') {
                                        vkpad = it?.version()
                                    }
                                    return false
                                } else {
                                    if (it.getName() == 'SHM Delay Talker Child') {
                                        if (vtalk == '') {
                                            vtalk = it?.version()
                                        }
                                        return false
                                    } else {
                                        if (it.getName() == 'SHM Delay User') {
                                            if (vuser == '') {
                                                vuser = it?.version()
                                            }
                                            return false
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
                uri += "&p=$vdelay"
                uri += "&c=$vchild"
                uri += "&m=$vmodefix"
                uri += "&u=$vuser"
                uri += "&k=$vkpad"
                uri += "&t=$vtalk"
                console.log("$uri")
                try {
                    asynchttp_v1.get('versiongetResponseHandler', ['uri': uri ])
                } 
                catch (let e) {
                    console.log("Execution failed $e")
                } 
                this.qsse_status_mode(event.value, false)
            

	})

    .subscribedEventHandler('keypadCodeHandler', (context, event) => {
        
                log.trace('got here!')
                if (!globalKeypadControl || globalDisable ) {
                    return false
                }
                let keypad = event.getDevice()
                let codeEntered = (event.value as String)
                let modeEntered = (event.data as Integer)
                if (modeEntered < 0 || modeEntered > 3) {
                    log.error("${app.label}: Unexpected arm mode $modeEntered sent by keypad!")
                    keypad.sendInvalidKeycodeResponse()
                    return false
                }
                let userName = false
                let badPin = true
                let error_message = ''
                let info_message = ''
                let pinKeypadsOK = false
                let userApps = this.getChildApps()
                userApps.find({ 
                    if (it.getName() == 'SHM Delay User' && it.theuserpin == codeEntered ) {
                        if (it.themaxcycles > 0) {
                            let atomicUseId = it.getId() + 'uses'
                            if (atomicState."$atomicUseId" < 0) {
                                atomicState."$atomicUseId" = 1
                            } else {
                                atomicState."$atomicUseId" = atomicState."$atomicUseId" + 1
                            }
                            if (atomicState."$atomicUseId" > it.themaxcycles) {
                                console.log("pin $codeEntered burned")
                                error_message = keypad.displayName + ' Burned pin entered for ' + it.theusername
                            }
                        }
                        badPin = false
                        if (error_message == '' && it.pinScheduled) {
                            let df = new java.text.SimpleDateFormat('EEEE')
                            df.setTimeZone(location.timeZone)
                            let day = df.format(new Date())
                            let df2 = new java.text.SimpleDateFormat('yyyyMMdd')
                            df2.setTimeZone(location.timeZone)
                            let nowymd = df2.format(new Date())
                            let dtbetween = true
                            let num_dtstart 
                            let num_dtend 
                            if (it.pinStartDt > '') {
                                num_dtstart = it.dtEdit(it.pinStartDt)
                            }
                            if (it.pinEndDt > '') {
                                num_dtend = it.dtEdit(it.pinEndDt)
                            }
                            if (it.pinStartDt > '' && it.pinEndDt > '') {
                                if (num_dtstart > nowymd || num_dtend < nowymd ) {
                                    error_message = keypad.displayName + ' dates out of range with pin for ' + it.theusername
                                }
                            } else {
                                if (it.pinStartDt > '') {
                                    if (num_dtstart > nowymd ) {
                                        error_message = keypad.displayName + ' start date error with pin for ' + it.theusername
                                    }
                                } else {
                                    if (it.pinEndDt > '') {
                                        if (num_dtend < nowymd ) {
                                            error_message = keypad.displayName + ' end date expired with pin for ' + it.theusername
                                        }
                                    }
                                }
                            }
                            if (error_message == '' && it.pinDays) {
                                if (!(it.pinDays.contains(day))) {
                                    error_message = keypad.displayName + " not valid on $day with pin for " + it.theusername
                                }
                            }
                            if (error_message == '' && it.pinStartTime > '' && it.pinEndTime > '') {
                                let between = this.timeOfDayIsBetween(it.pinStartTime.substring(11, 16), it.pinEndTime.substring(11, 16), new Date(), location.timeZone)
                                if (!between) {
                                    error_message = keypad.displayName + ' time out of range with pin for ' + it.theusername
                                }
                            }
                        }
                        if (error_message == '' && it.pinRestricted) {
                            if (it.pinModes) {
                                if (!(it.pinModes.contains(location.mode))) {
                                    error_message = keypad.displayName + ' mode: ' + location.mode + ' invalid with pin for ' + it.theusername
                                }
                            }
                            if (error_message == '' && it.pinRealKeypads || it.pinSimKeypads) {
                                it.pinRealKeypads.each({ let kp ->
                                    if (kp.displayName == keypad.displayName) {
                                        pinKeypadsOK = true
                                    }
                                })
                                it.pinSimKeypads.each({ let kp ->
                                    if (kp.displayName == keypad.displayName) {
                                        pinKeypadsOK = true
                                    }
                                })
                                if (!pinKeypadsOK) {
                                    error_message = keypad.displayName + ' invalid device with pin for ' + it.theusername
                                }
                            }
                        }
                        if (error_message == '') {
                            switch (it.thepinusage) {
                                case 'User':
                                    userName = it.theusername
                                    break
                                case 'Disabled':
                                    error_message = keypad.displayName + ' disabled pin entered for ' + it.theusername
                                    break
                                case 'Ignore':
                                    error_message = keypad.displayName + ' ignored pin entered for ' + it.theusername
                                    break
                                case 'Routine':
                                    error_message = keypad.displayName + ' executed routine ' + it.thepinroutine + ' with pin for ' + it.theusername
                                    location.helloHome?.execute(it.thepinroutine)
                                    break
                                case 'Panic':
                                    if (globalPanic) {
                                        error_message = keypad.displayName + ' Panic entered with pin for ' + it.theusername
                                        this.keypadPanicHandler(evt)
                                    } else {
                                        error_message = keypad.displayName + ' Panic entered but globalPanic flag disabled with pin for ' + it.theusername
                                    }
                                    break
                                case 'Piston':
                                    try {
                                        let params = ['uri': it.thepinpiston]
                                        asynchttp_v1.get('getResponseHandler', params)
                                        info_message = keypad.displayName + ' Piston executed with pin for ' + it.theusername
                                    } 
                                    catch (let e) {
                                        error_message = keypad.displayName + ' Piston Failed with pin for ' + it.theusername + ' ' + e 
                                    } 
                                    break
                                default: 
                                userName = it.theusername
                                break
                            }
                        }
                        return true
                    } else {
                        return false
                    }
                })
                if (error_message != '') {
                    badPin = true
                    this.sendNotificationEvent(error_message)
                } else {
                    if (info_message != '') {
                        this.sendNotificationEvent(info_message)
                    }
                }
                if (badPin) {
                    keypad.acknowledgeArmRequest(4)
                    this.acknowledgeArmRequest(4, keypad)
                    return null
                }
                if (!userName) {
                    keypad.sendInvalidKeycodeResponse()
                    return null
                }
                keypad.acknowledgeArmRequest(modeEntered)
                this.acknowledgeArmRequest(modeEntered, keypad)
                this.unschedule(execRoutine)
                let armModes = ['Home', 'Stay', 'Night', 'Away']
                let message = keypad.displayName + ' set mode to ' + armModes[ modeEntered ] + ' with pin for ' + userName 
                let aMap = ['data': ['codeEntered': codeEntered , 'armMode': armModes[ modeEntered ]]]
                if (modeEntered == 3 && globalKeypadExitDelay > 0) {
                    globalKeypadDevices.each({ 
                        it.setExitDelay(globalKeypadExitDelay)
                    })
                    this.runIn(globalKeypadExitDelay, execRoutine, aMap)
                    this.qsse_status_mode(false, 'Exit%20Delay')
                    let locevent = ['name': 'shmdelaytalk', 'value': 'exitDelay', 'isStateChange': true, 'displayed': true, 'descriptionText': 'Issue exit delay talk event', 'linkText': 'Issue exit delay talk event', 'data': globalKeypadExitDelay ]
                    this.sendLocationEvent(locevent)
                    this.findAllChildAppsByName('SHM Delay Child').each({ let delayChild ->
                        delayChild.delayTalkHandler(locevent)
                    })
                } else {
                    this.execRoutine(aMap.data)
                }
                this.sendNotificationEvent(message)
            

	})

    .subscribedEventHandler('keypadPanicHandler', (context, event) => {
        
                if (!globalKeypadControl || globalDisable || !globalPanic) {
                    return false
                }
                let alarm = location.currentState('alarmSystemStatus')
                let alarmstatus = alarm.value
                let keypad = event.getDevice()
                let panic_map = ['data': ['cycles': 5, 'keypad': keypad.name]]
                console.log("the initial panic map $panic_map ${keypad.name}")
                if (alarmstatus == 'off') {
                    this.setSHM('away')
                    this.runIn(1, keypadPanicExecute, panic_map)
                } else {
                    this.keypadPanicExecute(panic_map.data)
                }
            

	})
