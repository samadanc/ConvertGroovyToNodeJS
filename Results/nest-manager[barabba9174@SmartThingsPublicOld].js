
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initAutoApp', delay);

        context.api.schedules.runIn('initWatchdogApp', delay);

        context.api.schedules.runIn('initManagerApp', delay);

    })

    .scheduledEventHandler('initWatchdogApp', (context, event) => {
        
                let watDogApp = this.getChildApps()?.findAll({ 
                    it?.getAutomationType() == 'watchDog'
                })
                if (watDogApp?.size() < 1) {
                    this.LogAction('Installing Nest Watchdog App...', 'info', true)
                    this.addChildApp(this.textNamespace(), this.appName(), this.getWatchdogAppChildName(), ['settings': ['watchDogFlag': true]])
                } else {
                    if (watDogApp?.size() >= 1) {
                        let cnt = 1
                        watDogApp?.each({ let chld ->
                            if (cnt == 1) {
                                cnt = cnt + 1
                                chld.update()
                            } else {
                                if (cnt > 1) {
                                    this.LogAction("Deleting Extra Watchdog Instance($chld)...", 'warn', true)
                                    this.deleteChildApp(chld)
                                }
                            }
                        })
                    }
                }
            

	})

    .scheduledEventHandler('initManagerApp', (context, event) => {
        
                this.setStateVar()
                this.unschedule()
                this.unsubscribe()
                atomicState.pollingOn = false
                atomicState.lastChildUpdDt = null
                atomicState.lastForcePoll = null
                atomicState.swVersion = this.appVersion()
                if (this.addRemoveDevices()) {
                    atomicState.cmdQlist = []
                }
                if (settings?.thermostats || settings?.protects || settings?.cameras || settings?.presDevice || settings?.weatherDevice) {
                    atomicState?.isInstalled = true
                } else {
                    atomicState.isInstalled = false
                }
                this.subscriber()
                this.setPollingState()
                if (optInAppAnalytics) {
                    this.runIn(4, 'sendInstallData', ['overwrite': true])
                }
                this.runIn(50, 'stateCleanup', ['overwrite': true])
            

	})

    .scheduledEventHandler('initAutoApp', (context, event) => {
        
                if (settings['watchDogFlag']) {
                    atomicState?.automationType = 'watchDog'
                }
                let autoType = this.getAutoType()
                if (autoType == 'nMode') {
                    parent.automationNestModeEnabled(true)
                }
                this.unschedule()
                this.unsubscribe()
                this.automationsInst()
                if (autoType == 'schMot' && this.isSchMotConfigured()) {
                    let schedList = this.getScheduleList()
                    let timersActive = false
                    let sLbl 
                    let cnt = 1
                    let numact = 0
                    schedList?.each({ let scd ->
                        sLbl = "schMot_$scd_"
                        atomicState."schedule$cntSwEnabled" = null
                        atomicState."schedule$cntMotionEnabled" = null
                        atomicState."schedule$cntSensorEnabled" = null
                        let newscd = []
                        let act = settings["$sLblSchedActive"]
                        if (act) {
                            newscd = this.cleanUpMap(['m': settings["$sLblrestrictionMode"], 'tf': settings["$sLblrestrictionTimeFrom"], 'tfc': settings["$sLblrestrictionTimeFromCustom"], 'tfo': settings["$sLblrestrictionTimeFromOffset"], 'tt': settings["$sLblrestrictionTimeTo"], 'ttc': settings["$sLblrestrictionTimeToCustom"], 'tto': settings["$sLblrestrictionTimeToOffset"], 'w': settings["$sLblrestrictionDOW"], 's1': this.buildDeviceNameList(settings["$sLblrestrictionSwitchOn"], 'and'), 's0': this.buildDeviceNameList(settings["$sLblrestrictionSwitchOff"], 'and'), 'ctemp': this.roundTemp(settings["$sLblCoolTemp"]), 'htemp': this.roundTemp(settings["$sLblHeatTemp"]), 'hvacm': settings["$sLblHvacMode"], 'sen0': settings['schMotRemoteSensor'] ? this.buildDeviceNameList(settings["$sLblremSensor"], 'and') : null, 'm0': this.buildDeviceNameList(settings["$sLblMotion"], 'and'), 'mctemp': settings["$sLblMotion"] ? this.roundTemp(settings["$sLblMCoolTemp"]) : null, 'mhtemp': settings["$sLblMotion"] ? this.roundTemp(settings["$sLblMHeatTemp"]) : null, 'mhvacm': settings["$sLblMotion"] ? settings["$sLblMHvacMode"] : null, 'mdelayOn': settings["$sLblMotion"] ? settings["$sLblMDelayValOn"] : null, 'mdelayOff': settings["$sLblMotion"] ? settings["$sLblMDelayValOff"] : null])
                            numact += 1
                        }
                        this.LogAction("initAutoApp: [Schedule: $scd | sLbl: $sLbl | act: $act | newscd: $newscd]", 'info', true)
                        atomicState."sched$cntrestrictions" = newscd 
                        atomicState."schedule$cntSwEnabled" = newscd?.s1 || newscd?.s0 ? true : false
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
                atomicState?.lastAutomationSchedDt = null
                this.watchDogAutomation()
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
            

	})
