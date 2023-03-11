
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('managePressure', (context, event) => {
        
                let backOffRate = 5
                if (event.value == 'closed') {
                    state.voBackoff = state.voBackoff + 5
                    if (state.voBackoff == backOffRate ) {
                        this.logger(10, 'warn', "Initial pressure alert!, opening vents to 100%, initial backOff set to ${state.voBackoff}%")
                    } else {
                        this.logger(10, 'warn', "Continued pressure alert!, opening vents to 100%, backOff set to ${state.voBackoff}%")
                    }
                    this.setChildVents(100)
                } else {
                    if (state.voBackoff == backOffRate ) {
                        this.logger(10, 'info', "Initial alert cleared, trying with backOff at ${state.voBackoff}%")
                    } else {
                        this.logger(10, 'info', "Alert cleared, trying again with backOff at ${state.voBackoff}%")
                    }
                    this.notifyZones(['msg': 'pressureAlert', 'data': state.voBackoff])
                }
            

	})

    .subscribedEventHandler('checkNotify', (context, event) => {
        
                this.logger(40, 'debug', 'checkNotify:enter- ')
                let tempStr = ''
                let tempFloat = 0.0
                let tempBool = false
                let isSetback = false
                let delay = 0
                if (settings.fanRunOn) {
                    delay = settings.fanRunOn.toInteger()
                }
                let mainTemp = tempSensors.currentValue('temperature').toFloat()
                tempStr = this.getNormalizedOS(tStat.currentValue('thermostatOperatingState'))
                let mainState = state.mainState
                let mainStateChange = mainState != tempStr 
                mainState = tempStr 
                this.logger(40, 'info', "checkNotify- mainState: $mainState, mainStateChange: $mainStateChange")
                tempStr = this.getNormalizedOSES(tStat.currentValue('equipmentStatus'))
                let mainES = state.mainES
                let mainESChange = mainES != tempStr 
                mainES = tempStr 
                this.logger(40, 'info', "checkNotify- mainequipmentStatus: $mainES, mainequipmentStatusChange: $mainESChange")
                tempStr = tStat.currentValue('thermostatFanMode')
                let mainFan = state.mainFan
                this.logger(40, 'info', "checkNotify- mainFan: $mainFan, temStr: $tempStr")
                let mainFanChange = mainFan != tempStr 
                mainFan = tempStr 
                this.logger(40, 'info', "checkNotify- mainFan: $mainFan, mainFanChange: $mainFanChange")
                tempStr = this.getNormalizedOS(tStat.currentValue('thermostatMode'))
                let mainMode = state.mainMode
                let mainModeChange = mainMode != tempStr 
                mainMode = tempStr 
                this.logger(40, 'info', "checkNotify- mainMode: $mainMode, mainModeChange: $mainModeChange")
                let mainCSPChange = false
                let mainCSP 
                if (this.isAC()) {
                    tempFloat = tStat.currentValue('coolingSetpoint').toFloat()
                    mainCSP = state.mainCSP
                    mainCSPChange = mainCSP != tempFloat 
                    isSetback = tempFloat > mainCSP 
                    mainCSP = tempFloat 
                    this.logger(40, 'info', "checkNotify- mainCSP: $mainCSP, mainCSPChange: $mainCSPChange")
                }
                tempFloat = tStat.currentValue('heatingSetpoint').toFloat()
                let mainHSP = state.mainHSP
                let mainHSPChange = mainHSP != tempFloat 
                isSetback = tempFloat < mainHSP 
                mainHSP = tempFloat 
                this.logger(40, 'info', "checkNotify- mainHSP: $mainHSP, mainHSPChange: $mainHSPChange")
                let mainOn = mainState != 'idle'
                if (mainState == 'fan only') {
                    mainOn = true
                }
                this.logger(40, 'info', "checkNotify- mainState: $mainState")
                this.logger(40, 'info', "checkNotify- mainOn: $mainOn")
                state.mainES = mainES 
                state.mainState = mainState 
                state.mainFan = mainFan 
                state.mainMode = mainMode 
                if (this.isAC()) {
                    state.mainCSP = mainCSP 
                }
                state.mainHSP = mainHSP 
                state.mainTemp = mainTemp 
                if (mainStateChange) {
                    if (mainState == 'idle') {
                        state.cool = false
                        if (indicators) {
                            ACind.off()
                            Fanind.off()
                            Heatind.off()
                        }
                    }
                    if (mainState == 'off') {
                        state.cool = false
                        if (indicators) {
                            ACind.off()
                            Fanind.off()
                            Heatind.off()
                        }
                    }
                    if (mainState == 'cool') {
                        state.cool = true
                        if (indicators) {
                            ACind.on()
                        }
                    }
                    if (mainState == 'heat') {
                        if (indicators) {
                            Heatind.on()
                        }
                        if (state.night == false) {
                        }
                    }
                    if (mainState == 'fan only') {
                        if (indicators) {
                            Fanind.on()
                            Heatind.off()
                            ACind.off()
                        }
                        if (state.cool == false) {
                            if (state.night == false) {
                            }
                        }
                    }
                }
                if (mainStateChange && mainOn ) {
                    state.startTime = this.now() + location.timeZone.rawOffset
                    state.startTemp = mainTemp 
                    state.voBackoff = 0
                    state.reduceoutput = false
                    this.ChildNormalOutput()
                } else {
                    if (mainStateChange && !mainOn) {
                        state.endTime = this.now() + location.timeZone.rawOffset
                        state.endTemp = mainTemp 
                        state.voBackoff = 0
                        state.reduceoutput = false
                        this.logger(10, 'info', 'write log info cycle ended')
                    }
                }
                if (mainStateChange || mainModeChange || mainCSPChange || mainHSPChange || mainESChange ) {
                    let dataSet = ['msg': 'stat', 'data': ['initRequest': false, 'mainState': mainState , 'mainStateChange': mainStateChange , 'mainMode': mainMode , 'mainModeChange': mainModeChange , 'mainCSP': mainCSP , 'mainCSPChange': mainCSPChange , 'mainHSP': mainHSP , 'mainHSPChange': mainHSPChange , 'mainOn': mainOn , 'mainES': mainES ]]
                    if (dataSet == state.dataSet) {
                        this.logger(30, 'warn', "duplicate dataset, zones will not be notified... dataSet: ${state.dataSet}")
                    } else {
                        this.logger(30, 'debug', "dataSet: $dataSet")
                        if (mainStateChange) {
                            this.logger(10, 'info', "Main HVAC state changed to: $mainState")
                        }
                        if (mainModeChange) {
                            this.logger(10, 'info', "Main HVAC mode changed to: $mainMode")
                        }
                        if (mainCSPChange && this.isAC()) {
                            this.logger(10, 'info', "Main HVAC cooling setpoint changed to: $mainCSP")
                        }
                        if (mainHSPChange) {
                            this.logger(10, 'info', "Main HVAC heating setpoint changed to: $mainHSP")
                        }
                        if (mainESChannge) {
                            this.logger(10, 'info', "Main HVAC equipment status changed to: $mainES")
                        }
                        state.dataSet = dataSet 
                        if (delay > 0 && mainState == 'idle') {
                            this.logger(10, 'info', "Mainstate $mainState")
                            this.logger(10, 'info', "Zone notification is scheduled in $delay delay")
                            this.runIn(delay, notifyZones)
                        } else {
                            this.notifyZones()
                        }
                    }
                }
                this.logger(40, 'debug', 'checkNotify:exit- ')
            

	})

    .subscribedEventHandler('nighthandler', (context, event) => {
        
                log.info("nighthandler- evt name: ${event.name}, value: ${event.value}")
                let nightEnabled = event.value == 'on'
                if (nightmode) {
                    if (nightEnabled) {
                        state.night = false
                        log.info("Zone was enabled via: [${nightmode.displayName}]")
                    } else {
                        state.night = true
                        log.info("Zone was disabled via: [${nightmode.displayName}]")
                    }
                }
            

	})
