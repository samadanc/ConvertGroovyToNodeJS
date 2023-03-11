
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
                this.logger(40, 'debug', "checkNotify:evt: $evt")
                this.logger(40, 'debug', "checkNotify:MainTstatState: ${this.getMainTstatState()}")
                let tempStr = ''
                let tempFloat = 0.0
                let tempBool = false
                let delay = 0
                if (settings.fanRunOn) {
                    delay = settings.fanRunOn.toInteger()
                }
                let mainTemp = tempSensors.currentValue('temperature').toFloat()
                state.mainTemp = mainTemp 
                tempStr = this.getMainTstatState()
                this.logger(40, 'debug', "checkNotify:MainTstatState: ${this.getMainTstatState()}")
                let mainState = state.mainState
                let mainStateChange = mainState != tempStr 
                mainState = tempStr 
                state.mainState = mainState 
                let mainOn = mainState != 'IDLE'
                this.logger(40, 'info', "checkNotify- mainState: $mainState, mainStateChange: $mainStateChange")
                let mainCSPChange = false
                let mainCSP 
                if (this.isAC()) {
                    tempFloat = tStat.currentValue('coolingSetpoint').toFloat()
                    mainCSP = state.mainCSP
                    mainCSPChange = mainCSP != tempFloat 
                    mainCSP = tempFloat 
                    state.mainCSP = mainCSP 
                    this.logger(40, 'info', "checkNotify- mainCSP: $mainCSP, mainCSPChange: $mainCSPChange")
                }
                tempFloat = tStat.currentValue('heatingSetpoint').toFloat()
                let mainHSP = state.mainHSP
                let mainHSPChange = mainHSP != tempFloat 
                mainHSP = tempFloat 
                state.mainHSP = mainHSP 
                this.logger(40, 'info', "checkNotify- mainHSP: $mainHSP, mainHSPChange: $mainHSPChange")
                if (mainStateChange) {
                    if (indicators) {
                        switch ( mainState ) {
                            case 'HEAT':
                                ACind.off()
                                Fanind.off()
                                Heatind.on()
                                break
                            case 'COOL':
                                ACind.on()
                                Fanind.off()
                                Heatind.off()
                                break
                            case 'FAN':
                                ACind.off()
                                Fanind.on()
                                Heatind.off()
                                break
                            default: 
                            ACind.off()
                            Fanind.off()
                            Heatind.off()
                            break
                        }
                    }
                    if (mainOn) {
                        this.logger(10, 'info', 'start log info cycle ended')
                        state.startTime = this.now() + location.timeZone.rawOffset
                        state.startTemp = mainTemp 
                        state.voBackoff = 0
                        state.reduceoutput = false
                        this.ChildNormalOutput()
                    } else {
                        state.endTime = this.now() + location.timeZone.rawOffset
                        state.endTemp = mainTemp 
                        state.voBackoff = 0
                        state.reduceoutput = false
                        this.logger(10, 'info', 'write log info cycle ended')
                    }
                }
                if (mainStateChange || mainCSPChange || mainHSPChange ) {
                    let dataSet = ['msg': 'stat', 'data': ['initRequest': false, 'mainState': mainState , 'mainStateChange': mainStateChange , 'mainCSP': mainCSP , 'mainCSPChange': mainCSPChange , 'mainHSP': mainHSP , 'mainHSPChange': mainHSPChange , 'mainOn': mainOn ]]
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
                        state.dataSet = dataSet 
                        if (delay > 0 && mainState == 'IDLE') {
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
