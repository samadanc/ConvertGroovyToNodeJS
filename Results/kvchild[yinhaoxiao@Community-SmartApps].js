
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('zoneDisableHandeler', (context, event) => {
        
                this.logger(30, 'debug', "zoneDisableHandeler- evt name: ${event.name}, value: ${event.value}")
                if (event.isStateChange()) {
                    this.zoneEvaluate(['msg': 'zoneSwitch', 'data': ['zoneIsEnabled': event.value == 'on']])
                }
            

	})

    .subscribedEventHandler('tempHandler', (context, event) => {
        
                this.logger(40, 'debug', "tempHandler- evt name: ${event.name}, value: ${event.value}")
                state.zoneTemp = event.value.toFloat()
                if (state.mainOn) {
                    this.logger(30, 'debug', "tempHandler- tempChange, value: ${event.value}")
                    this.zoneEvaluate(['msg': 'temp', 'data': ['tempChange']])
                }
            

	})

    .subscribedEventHandler('levelHandler', (context, event) => {
        
                this.logger(40, 'debug', 'levelHandler:enter- ')
                this.logger(30, 'debug', "levelHandler- evt name: ${event.name}, value: ${event.value}, rdLen: ${(event.description == )}")
                let ventData = state."${event.deviceId}"
                let oldVO = state.voRequest ? state.voRequest : -1.toInteger()
                let resetVent = false
                if (ventData != null) {
                    let v = event.value.toFloat().round(0).toInteger()
                    if (event.value.isInteger() == false) {
                        ventData.voActual = v 
                    } else {
                        ventData.voRequest = v 
                        if (v == oldVO ) {
                            this.logger(30, 'debug', 'levelHandler- VL request OK')
                        } else {
                            this.logger(30, 'warn', 'levelHandler- External VL request!!!')
                            resetVent = true
                        }
                    }
                    state."${event.deviceId}" = ventData 
                }
                this.logger(40, 'debug', 'levelHandler:exit- ')
            

	})

    .subscribedEventHandler('getAdjustedPressure', (context, event) => {
        
                this.logger(40, 'debug', 'getAdjustedPressure:enter- ')
                if (state.mainOn || vPolling == true) {
                    this.logger(30, 'info', "getAdjustedPressure- evt name: ${event.name}, value: ${event.value}")
                    let vid = event.deviceId
                    let vent = vents.find({ 
                        it.id == vid 
                    })
                    let stdT = 273.15
                    let stdP = 101325.0
                    let stdD = 1.2041
                    let vo = vent.currentValue('level').toFloat().round(0).toInteger()
                    let P1 = vent.currentValue('pressure').toFloat()
                    let T = vent.currentValue('temperature').toFloat()
                    let T1 = this.tempToK(T)
                    let pAdjusted = P1 * stdT / T1 
                    let pVelocity = Math.sqrt(2 * P1 / stdD ).round(0).toInteger()
                    let pVelocityAdjusted = Math.sqrt(2 * pAdjusted / stdD ).round(0).toInteger()
                    let roAdj 
                    let roAct 
                    let vAdj 
                    let vAct 
                    if (state."$vid") {
                        roAdj = state."$vid".pInitAdj ? state."$vid".pInitAdj : pAdjusted - pAdjusted 
                        roAct = state."$vid".pInitAct ? state."$vid".pInitAct : P1 - P1 
                        vAdj = state."$vid".vInitAdj ? state."$vid".vInitAdj : pVelocityAdjusted - pVelocityAdjusted 
                        vAct = state."$vid".vInitAct ? state."$vid".vInitAct : pVelocity - pVelocity 
                    }
                    this.logger(15, 'debug', "getAdjustedPressure- [${vent.displayName}] monitor~ roAdj: ${roAdj.round(1)}, roAct: ${roAct.round(1)}, vAdj: $vAdj, vAct: $vAct, adjusted~ p: ${pAdjusted.round(0).toInteger()} Pa, v: $pVelocityAdjusted, actuals~ p: ${P1.round(0).toInteger()} Pa, v: $pVelocity, vo: $vo%, mainOn: ${state.mainOn}")
                }
                this.logger(40, 'debug', 'getAdjustedPressure:exit- ')
            

	})
