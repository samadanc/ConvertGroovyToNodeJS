
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initAutoApp', delay);

    })

    .scheduledEventHandler('initAutoApp', (context, event) => {
        
                if (settings['watchDogFlag']) {
                    atomicState?.automationType = 'watchDog'
                } else {
                    if (settings['storageFlag']) {
                        atomicState?.automationType = 'storage'
                        parent?.storageAppInst(true)
                    } else {
                        if (settings['remDiagFlag']) {
                            atomicState?.automationType = 'remDiag'
                            parent?.remDiagAppAvail(true)
                        }
                    }
                }
                let autoType = this.getAutoType()
                if (autoType == 'nMode') {
                    parent.automationNestModeEnabled(true)
                }
                this.unschedule()
                this.unsubscribe()
                let autoDisabled = this.getIsAutomationDisabled()
                this.setAutomationStatus()
                this.automationsInst()
                if (autoType == 'schMot' && this.isSchMotConfigured()) {
                    this.updateScheduleStateMap()
                    let schedList = this.getScheduleList()
                    let timersActive = false
                    let sLbl 
                    let cnt = 1
                    let numact = 0
                    schedList?.each({ let scd ->
                        sLbl = "schMot_$scd_"
                        atomicState."schedule$cntSwEnabled" = null
                        atomicState."schedule$cntPresEnabled" = null
                        atomicState."schedule$cntMotionEnabled" = null
                        atomicState."schedule$cntSensorEnabled" = null
                        let newscd = [:]
                        let act = settings["$sLblSchedActive"]
                        if (act) {
                            newscd = this.cleanUpMap(['m': settings["$sLblrestrictionMode"], 'tf': settings["$sLblrestrictionTimeFrom"], 'tfc': settings["$sLblrestrictionTimeFromCustom"], 'tfo': settings["$sLblrestrictionTimeFromOffset"], 'tt': settings["$sLblrestrictionTimeTo"], 'ttc': settings["$sLblrestrictionTimeToCustom"], 'tto': settings["$sLblrestrictionTimeToOffset"], 'w': settings["$sLblrestrictionDOW"], 'p1': this.buildDeviceNameList(settings["$sLblrestrictionPresHome"], 'and'), 'p0': this.buildDeviceNameList(settings["$sLblrestrictionPresAway"], 'and'), 's1': this.buildDeviceNameList(settings["$sLblrestrictionSwitchOn"], 'and'), 's0': this.buildDeviceNameList(settings["$sLblrestrictionSwitchOff"], 'and'), 'ctemp': this.roundTemp(settings["$sLblCoolTemp"]), 'htemp': this.roundTemp(settings["$sLblHeatTemp"]), 'hvacm': settings["$sLblHvacMode"], 'sen0': settings['schMotRemoteSensor'] ? this.buildDeviceNameList(settings["$sLblremSensor"], 'and') : null, 'thres': settings['schMotRemoteSensor'] ? settings["$sLblremSenThreshold"] : null, 'm0': this.buildDeviceNameList(settings["$sLblMotion"], 'and'), 'mctemp': settings["$sLblMotion"] ? this.roundTemp(settings["$sLblMCoolTemp"]) : null, 'mhtemp': settings["$sLblMotion"] ? this.roundTemp(settings["$sLblMHeatTemp"]) : null, 'mhvacm': settings["$sLblMotion"] ? settings["$sLblMHvacMode"] : null, 'mdelayOn': settings["$sLblMotion"] ? settings["$sLblMDelayValOn"] : null, 'mdelayOff': settings["$sLblMotion"] ? settings["$sLblMDelayValOff"] : null])
                            numact += 1
                        }
                        this.LogTrace("initAutoApp: [Schedule: $scd | sLbl: $sLbl | act: $act | newscd: $newscd]")
                        atomicState."sched$cntrestrictions" = newscd 
                        atomicState."schedule$cntSwEnabled" = newscd?.s1 || newscd?.s0 ? true : false
                        atomicState."schedule$cntPresEnabled" = newscd?.p1 || newscd?.p0 ? true : false
                        atomicState."schedule$cntMotionEnabled" = newscd?.m0 ? true : false
                        atomicState."schedule$cntSensorEnabled" = newscd?.sen0 ? true : false
                        atomicState."schedule$cntTimeActive" = newscd?.tf || newscd?.tfc || newscd?.tfo || newscd?.tt || newscd?.ttc || newscd?.tto || newscd?.w ? true : false
                        atomicState."$sLblMotionActiveDt" = null
                        atomicState."$sLblMotionInActiveDt" = null
                        let newact = this.isMotionActive(settings["$sLblMotion"])
                        if (newact) {
                            atomicState."$sLblMotionActiveDt" = this.getDtNow()
                        } else {
                            atomicState."$sLblMotionInActiveDt" = this.getDtNow()
                        }
                        atomicState."$sLbloldMotionActive" = newact 
                        atomicState?."motion$cntUseMotionSettings" = null
                        atomicState?."motion$cntLastisBtwn" = false
                        timersActive = timersActive || atomicState."schedule$cntTimeActive" ? true : false
                        cnt += 1
                    })
                    atomicState.scheduleTimersActive = timersActive 
                    atomicState.lastSched = null
                    atomicState.scheduleSchedActiveCount = numact 
                }
                this.subscribeToEvents()
                this.scheduler()
                app.updateLabel(this.getAutoTypeLabel())
                this.LogAction("Automation Label: ${this.getAutoTypeLabel()}", 'info', true)
                if (settings?."$autoTypePushoverEnabled" == true) {
                    this.pushover_init()
                } else {
                    this.pushover_cleanup()
                }
                state.remove('motionnullLastisBtwn')
                state.remove('motion1InBtwn')
                state.remove('motion2InBtwn')
                state.remove('motion3InBtwn')
                state.remove('motion4InBtwn')
                state.remove('TstatTurnedOff')
                state.remove('schedule{1}TimeActive')
                state.remove('schedule{2}TimeActive')
                state.remove('schedule{3}TimeActive')
                state.remove('schedule{4}TimeActive')
                state.remove('schedule{5}TimeActive')
                state.remove('schedule{6}TimeActive')
                state.remove('schedule{7}TimeActive')
                state.remove('schedule{8}TimeActive')
                state.remove('lastaway')
                state.remove('evalSched')
                state.remove('debugAppendAppName')
                state.remove('enRemDiagLogging')
                state.remove('weatherDeviceInst')
                this.scheduleAutomationEval(30)
            

	})
