
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('initAutoApp', delay);

        context.api.schedules.runIn('initManagerApp', delay);

    })

    .scheduledEventHandler('initManagerApp', (context, event) => {
        
                this.LogTrace('initManagerApp')
                this.setStateVar()
                this.restStreamHandler(true)
                atomicState?.restStreamingOn = false
                atomicState.ssdpOn = false
                this.unschedule()
                this.unsubscribe()
                this.stateCleanup()
                atomicState.pollingOn = false
                atomicState.lastChildUpdDt = null
                atomicState.lastForcePoll = null
                let sData = atomicState?.swVer ? atomicState?.swVer : [:]
                sData['mgrVer'] = this.appVersion()
                atomicState?.swVer = sData 
                if (settings?.structures && atomicState?.structures && !atomicState.structName) {
                    let structs = this.getNestStructures()
                    if (structs && structs["${atomicState?.structures}"]) {
                        atomicState.structName = structs[atomicState?.structures]?.toString()
                    }
                }
                if (!(this.addRemoveDevices())) {
                    atomicState.cmdQlist = []
                }
                if (settings?.thermostats || settings?.protects || settings?.cameras || settings?.presDevice || settings?.weatherDevice) {
                    atomicState?.isInstalled = true
                } else {
                    atomicState.isInstalled = false
                }
                if (atomicState?.autoMigrationComplete == true) {
                    let iData = atomicState?.installData
                    iData['usingNewAutoFile'] = true
                    atomicState?.installData = iData 
                }
                this.subscriber()
                this.setPollingState()
                this.startStopStream()
                this.runIn(21, 'finishInitManagerApp', ['overwrite': true])
            

	})

    .scheduledEventHandler('initAutoApp', (context, event) => {
        
                let appLbl = this.getCurAppLbl()
                this.LogAction("initAutoApp(): called by $appLbl; May need REINSTALL", 'warn', true)
                this.unschedule()
                this.unsubscribe()
                let autoDisabled = this.getIsAutomationDisabled()
                app.updateLabel(this.getAutoTypeLabel())
                atomicState?.lastAutomationSchedDt = null
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
                state.remove('lastaway')
                state.remove('debugAppendAppName')
                state.remove('enRemDiagLogging')
            

	})
