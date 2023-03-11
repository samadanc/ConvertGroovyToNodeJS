
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('checkNotify', (context, event) => {
        
                this.logger(40, 'debug', 'checkNotify:enter- ')
                let tempStr = ''
                let tempFloat = 0.0
                let delay = settings.fanRunOn.toInteger()
                tempStr = this.getNormalizedOS(tStat.currentValue('thermostatOperatingState'))
                let mainState = state.mainState
                let mainStateChange = mainState != tempStr 
                mainState = tempStr 
                this.logger(40, 'info', "checkNotify- mainState: $mainState, mainStateChange: $mainStateChange")
                tempStr = this.getNormalizedOS(tStat.currentValue('thermostatMode'))
                let mainMode = state.mainMode
                let mainModeChange = mainMode != tempStr 
                mainMode = tempStr 
                this.logger(40, 'info', "checkNotify- mainMode: $mainMode, mainModeChange: $mainModeChange")
                tempFloat = tStat.currentValue('coolingSetpoint').toFloat()
                let mainCSP = state.mainCSP
                let mainCSPChange = mainCSP != tempFloat 
                mainCSP = tempFloat 
                this.logger(40, 'info', "checkNotify- mainCSP: $mainCSP, mainCSPChange: $mainCSPChange")
                tempFloat = tStat.currentValue('heatingSetpoint').toFloat()
                let mainHSP = state.mainHSP
                let mainHSPChange = mainHSP != tempFloat 
                mainHSP = tempFloat 
                this.logger(40, 'info', "checkNotify- mainHSP: $mainHSP, mainHSPChange: $mainHSPChange")
                let mainOn = mainState != 'idle'
                state.mainState = mainState 
                state.mainMode = mainMode 
                state.mainCSP = mainCSP 
                state.mainHSP = mainHSP 
                if (mainStateChange || mainModeChange || mainCSPChange || mainHSPChange ) {
                    if (mainStateChange) {
                        this.logger(10, 'info', "Main HVAC state changed to: $mainState")
                    }
                    if (mainModeChange) {
                        this.logger(10, 'info', "Main HVAC mode changed to: $mainMode")
                    }
                    if (mainCSPChange) {
                        this.logger(10, 'info', "Main HVAC cooling setpoint changed to: $mainCSP")
                    }
                    if (mainHSPChange) {
                        this.logger(10, 'info', "Main HVAC heating setpoint changed to: $mainHSP")
                    }
                    let dataSet = ['msg': 'stat', 'data': ['initRequest': false, 'mainState': mainState , 'mainStateChange': mainStateChange , 'mainMode': mainMode , 'mainModeChange': mainModeChange , 'mainCSP': mainCSP , 'mainCSPChange': mainCSPChange , 'mainHSP': mainHSP , 'mainHSPChange': mainHSPChange , 'mainOn': mainOn , 'delay': delay ]]
                    this.logger(30, 'debug', "dataSet: $dataSet")
                    this.notifyZones(dataSet)
                }
                this.logger(40, 'debug', 'checkNotify:exit- ')
            

	})
