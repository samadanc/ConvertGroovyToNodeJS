
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'reminderHandler')

    })

    .subscribedEventHandler('reminderHandler', (context, event) => {
        
                let rHumOk = false
                let rTempOk = false
                let rMinWinOk = false
                let rModeOk = false
                let devList = []
                if (rMode == null) {
                    rModeOk = true
                }
                if (rMode) {
                    if (rMode?.contains(location.mode)) {
                        rModeOk = true
                    } else {
                        rModeOk = false
                        if (rModeOk == false) {
                            log.warn('House Fan Controller Reminder message not sent because the mode is not correct')
                        }
                    }
                }
                if (cContactWindow == null) {
                    rMinWinOk = true
                }
                let cContactWindowSize = cContactWindow?.size()
                cContactWindow.each({ let deviceName ->
                    let status = deviceName.currentValue('contact')
                    if ("$status" == 'open') {
                        String device = ((String) deviceName)
                        devList += device 
                    }
                    if (devList.size() <= rMinWinOpen ) {
                        rMinWinOk = true
                    }
                    if (devList.size() > rMinWinOpen ) {
                        rMinWinOk = false
                        log.warn('House Fan Controller Reminder message not sent because there are too many windows open')
                    }
                })
                if (rHumidity == null) {
                    rHumOk = true
                }
                if (rHumidity) {
                    java.lang.Integer rHumidityStopVal = rHumidityStop == null ? 0 : (rHumidityStop as int)
                    rHumidity.each({ let deviceName ->
                        let status = deviceName.currentValue('humidity')
                        if (rHumidityLevel == 'above') {
                            rHumidityStopVal = rHumidityStopVal == 0 ? 999 : (rHumidityStopVal as int)
                            if (status >= rHumidityPercent && status <= rHumidityStopVal ) {
                                cHumOk = true
                            }
                        }
                        if (rHumidityLevel == 'below') {
                            if (status <= rHumidityPercent && status >= rHumidityStopVal ) {
                                rHumOk = true
                            }
                        }
                    })
                    if (rHumOk == false) {
                        log.warn('House Fan Controller Reminder message not sent due to the Humidity being out of range')
                    }
                }
                if (rTemperature == null) {
                    rTempOk = true
                }
                if (rTemperature) {
                    java.lang.Integer rTemperatureStopVal = rTemperatureStop == null ? 0 : (rTemperatureStop as int)
                    rTemperature.each({ let deviceName ->
                        let status = deviceName.currentValue('temperature')
                        if (rTemperatureLevel == 'above') {
                            rTemperatureStopVal = rTemperatureStopVal == 0 ? 999 : (rTemperatureStopVal as int)
                            if (status >= rTemperatureDegrees && status <= rTemperatureStopVal ) {
                                rTempOk = true
                            }
                        }
                        if (rTemperatureLevel == 'below') {
                            if (status <= rTemperatureDegrees && status >= rTemperatureStopVal ) {
                                rTempOk = true
                            }
                        }
                    })
                    if (rTempOk == false) {
                        log.warn('House Fan Controller Reminder message not sent due to the Temperature being out of range')
                    }
                }
                if (priFan.currentValue('switch') == 'off' && state.msgTimer == true) {
                    if (state.msgTimer == true) {
                        state.msgTimer = false
                        this.runIn(msgTime * 3600, 'msgTimerDelay')
                    }
                    if (rTempOk == true && rHumOk == true && rMinWinOk == true && rModeOk == true) {
                        state.msgTimer = false
                        if (remMsg != null) {
                            let tts = remMsg 
                            this.sendLocationEvent(['name': 'SmartMessageControl', 'value': 'House Fan Controller Reminder', 'isStateChange': true, 'descriptionText': "$tts"])
                            log.info("Message sent to Smart Message Control: Msg = $tts")
                        }
                    }
                }
                if (overRide == false) {
                    log.warn('The override is disabled and the fan will turn off')
                    if (priFan.currentValue('switch') == 'on' && rTempOk == false || rHumOk == false || rMinWinOk == false || rModeOk == false) {
                        priFan.off()
                        let tts = 'The attic fan has been turned off because the conditions outside are now outside of your selected parameters'
                    }
                }
            

	})

    .subscribedEventHandler('autoModeOff', (context, event) => {
        
                log.info('autoMode Off method called')
                let msg = "The $priFan is being turned off due to the number of open windows falling below the number of windows required to be open. " + "The minimum number of required open windows is, $minWinOpen"
                let fanStatus = priFan.currentValue('switch')
                let devList = []
                if (fanStatus == 'on') {
                    let cContactWindowSize = cContactWindow?.size()
                    cContactWindow.each({ let deviceName ->
                        let status = deviceName.currentValue('contact')
                        if (status == 'open') {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList.size()
                    log.info("Open Windows = $devListSize. Minimum requirement is $minWinClose")
                    if ("$devListSize" < "$minWinClose") {
                        this.safetyMethod()
                        this.ttsActions(msg)
                        priFan.off()
                    }
                    if (cContactWindowAll == true) {
                        if ("$devListSize" < "$cContactWindowSize") {
                            msg = "The $priFan is being turned off due to the number of open windows falling below the number of windows required to be open. " + "The minimum number of required open windows is, $cContactWindowSize"
                            priFan.off()
                            state.autoMode = false
                            this.ttsActions(msg)
                        }
                    }
                }
                if (fanStatus == 'off') {
                    log.info('processing because the fan is now off')
                    let cContactWindowSize = cContactWindow?.size()
                    cContactWindow.each({ let deviceName ->
                        let status = deviceName.currentValue('contact')
                        if (status == 'open') {
                            String device = ((String) deviceName)
                            devList += device 
                        }
                    })
                    let devListSize = devList.size()
                    log.info("devListSize is: $devListSize")
                    if (devListSize == 0 || "$devListSize" == null) {
                        log.info('All windows are closed. Actions will now be performed')
                        this.processOffActions(evt)
                    }
                }
            

	})

    .subscribedEventHandler('windowsOpen', (context, event) => {
        
                log.info('Windows open message sent')
                let devList = []
                let cContactWindowSize = cContactWindow?.size()
                cContactWindow.each({ let deviceName ->
                    let status = deviceName.currentValue('contact')
                    if (status == 'open') {
                        String device = ((String) deviceName)
                        devList += device 
                    }
                })
                let msg = "The air conditioner will be reset when the last window is closed. The following ${devList.size}() windows " + "are currently open.  $devList"
                this.ttsActions(msg)
            

	})

    .subscribedEventHandler('autoModeOn', (context, event) => {
        
                log.info('autoMode On method called')
                this.safetyCheck(text)
                if (state.safetyCheck == true) {
                    let fanStatus = priFan.currentValue('switch')
                    let devList = []
                    if (fanStatus == 'off' && auto == true) {
                        if (minWinOpen > 0) {
                            let cContactWindowSize = cContactWindow?.size()
                            cContactWindow.each({ let deviceName ->
                                let status = deviceName.currentValue('contact')
                                if (status == 'open') {
                                    String device = ((String) deviceName)
                                    devList += device 
                                }
                            })
                            let devListSize = devList.size()
                            if (devListSize > minWinOpen ) {
                                log.info("There are at least $minWinOpen windows already open, no actions taken")
                            }
                            if ("$devListSize" == "$minWinOpen") {
                                let msg = "The whole house fan has been automatically turned on due to $minWinOpen windows being opened"
                                state.autoMode = true
                                this.conditionHandler(evt)
                                this.ttsActions(msg)
                            }
                        }
                    } else {
                        if (fanStatus == 'on') {
                            this.conditionHandler(evt)
                        }
                    }
                }
            

	})
