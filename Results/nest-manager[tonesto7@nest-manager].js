
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('reInitBuiltins', delay);

        context.api.schedules.runIn('initManagerApp', delay);

    })

    .scheduledEventHandler('reInitBuiltins', (context, event) => {
        
                this.checkStorageApp()
                if (!(this.isAppLiteMode())) {
                    this.initWatchdogApp()
                    this.initNestModeApp()
                    this.initStorageApp()
                }
                if (atomicState?.tsMigration) {
                    this.initRemDiagApp()
                }
            

	})

    .scheduledEventHandler('initManagerApp', (context, event) => {
        
                this.LogTrace("initManagerApp (${atomicState?.pollBlocked}) (${atomicState?.pollBlockedReason})")
                this.setStateVar()
                this.unschedule()
                this.unsubscribe()
                atomicState?.pollingOn = false
                atomicState?.restStreamingOn = false
                atomicState?.streamPolling = false
                atomicState.ssdpOn = false
                this.stateCleanup()
                this.initStorageApp()
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
                    if (!(this.isAppLiteMode())) {
                        this.runIn(15, 'reInitBuiltins', ['overwrite': true])
                    }
                }
                if (settings?.thermostats || settings?.protects || settings?.cameras || settings?.presDevice || settings?.weatherDevice) {
                    atomicState?.isInstalled = true
                } else {
                    atomicState.isInstalled = false
                }
                this.subscriber()
                this.startStopStream()
                this.runIn(21, 'finishInitManagerApp', ['overwrite': true])
            

	})
