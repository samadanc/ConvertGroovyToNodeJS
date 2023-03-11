
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('checkAttr', (context, event) => {
        
                if (log) {
                    log.info("	checkAttr: name = ${event.name} | value = ${event.value} | source = ${event.source}")
                }
                if (state.watoDisabled) {
                    return null
                }
                if (inModes && !(inModes.contains(location.currentMode.toString()))) {
                    return null
                }
                if (fromTime && toTime ) {
                    let fTime = this.timeToday(fromTime, location.timeZone)
                    let tTime = this.timeToday(toTime, location.timeZone)
                    while (fTime > tTime ) {
                        tTime = tTime.plus(1)
                    }
                    let nowDate = new Date(this.now())
                    if (!(this.timeOfDayIsBetween(fTime, tTime, nowDate, location.timeZone))) {
                        return null
                    }
                }
                let eV = this.checkVal()
                if (eV == -99999) {
                    return null
                }
                let evtVal = this.setValType(eV)
                if (evtVal == null) {
                    return null
                }
                let aV = attrCase ? attrVal.toLowerCase() : attrVal 
                let match = false
                let noCmdRun = false
                switch (attrOp.toString()) {
                    case '<':
                        if (evtVal < aV ) {
                            match = true
                        }
                        break
                    case '<=':
                        if (evtVal <= aV ) {
                            match = true
                        }
                        break
                    case '=':
                        if (evtVal == aV ) {
                            match = true
                        }
                        break
                    case '>=':
                        if (evtVal >= aV ) {
                            match = true
                        }
                        break
                    case '>':
                        if (evtVal > aV ) {
                            match = true
                        }
                        break
                    case '!=':
                        if (evtVal != aV ) {
                            match = true
                        }
                        break
                    case '⬆︎':
                        let prvAttrVal = this.setValType(state.prvAttrVal)
                        if (evtVal > aV ) {
                            if (prvAttrVal <= aV ) {
                                match = true
                            } else {
                                noCmdRun = true
                            }
                        } else {
                            if (prvAttrVal <= aV ) {
                                noCmdRun = true
                            }
                        }
                        break
                    case '⬇︎':
                        let prvAttrVal = this.setValType(state.prvAttrVal)
                        if (evtVal < aV ) {
                            if (prvAttrVal >= aV ) {
                                match = true
                            } else {
                                noCmdRun = true
                            }
                        } else {
                            if (prvAttrVal >= aV ) {
                                noCmdRun = true
                            }
                        }
                        break
                    case '⬆︎⬇︎':
                        if (evtVal != state.prvAttrVal) {
                            match = true
                        }
                        break
                    case '⊃':
                        if (evtVal.toString().contains(aV.toString())) {
                            match = true
                        }
                        break
                }
                state.prvAttrVal = evtVal 
                if (noCmdRun) {
                    return null
                }
                if (state.hT == _SmartThings || state.hT == _Hubitat && !cmdOrRM) {
                    let cmd = match ? devCmd : devUnCmd 
                    if (!cmd) {
                        return null
                    }
                    let paramCnt = match ? state.cParams ? state.cParams : 0 : state.unCParams ? state.unCParams : 0
                    let param1Val 
                    if (paramCnt > 0) {
                        param1Val = match ? devCParamTyp1 == 'A' ? evtVal : devCParamTyp1 == 'D' ? devCParamTyp1Dev."current${(devCParamTyp1Attr.substring(0, 1).toUpperCase() + devCParamTyp1Attr.substring(1))}" : devCParam1 : devUnCParamTyp1 == 'A' ? evtVal : devUnCParamTyp1 == 'D' ? devUnCParamTyp1Dev."current${(devUnCParamTyp1Attr.substring(0, 1).toUpperCase() + devUnCParamTyp1Attr.substring(1))}" : devUnCParam1 
                    }
                    switch ( paramCnt ) {
                        case 0:
                            dev."$cmd"()
                            break
                        case 1:
                            dev."$cmd"(this.toMap(param1Val))
                            break
                        case 2:
                            dev."$cmd"(param1Val, match ? devCParam2 : devUnCParam2 )
                            break
                        case 3:
                            dev."$cmd"(param1Val, match ? devCParam2 : devUnCParam2 , match ? devCParam3 : devUnCParam3 )
                            break
                        default: 
                        dev."$cmd"()
                        break
                    }
                } else {
                    if (state.hT == _Hubitat ) {
                        let rule = []
                        rule << match ? devRule : devUnRule 
                        if (!rule) {
                            return null
                        }
                        RMUtils.sendAction(rule, 'runRuleAct', app.label)
                    }
                }
            

	})
