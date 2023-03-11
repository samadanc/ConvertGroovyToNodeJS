
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('cmdHandler', (context, event) => {
        
                let sceneID = state.vtMaps[event.deviceId]
                let nid = app.id + '/' + sceneID 
                let cmd = event.data.split('~')[1]
                let logInfo = true
                let stateMapsOK = true
                if (logInfo) {
                    log.info("cmdHandler- scene:$sceneID name:${event.name} value:${event.value}  cmd:$cmd")
                }
                if (cmd in ['warn', 'override']) {
                    return null
                }
                let isOverride = false
                let sceneSwitches = this.getChildDevices()
                let callingSwitch = this.getChildDevice(nid)
                sceneSwitches.each({ let sceneSwitch ->
                    if (sceneSwitch.currentValue('switch') != 'off' && sceneSwitch.id != event.deviceId) {
                        sceneSwitch.overrideScene()
                        isOverride = true
                        if (logInfo) {
                            log.info("cmdHandler- override request from ${event.displayName} to ${sceneSwitch.displayName}")
                        }
                    }
                })
                if (event.value == 'on' && cmd == 'snap') {
                    if (logInfo) {
                        log.info("cmdHandler- $sceneID snap request")
                    }
                    this.sceneSnap(sceneID, true)
                    callingSwitch.off()
                    return null
                }
                if (event.value == 'on' && isOverride ) {
                    if (logInfo) {
                        log.info("cmdHandler- $sceneID on with ignore snap request")
                    }
                    stateMapsOK = this.setScene(sceneID, true, false)
                } else {
                    if (event.value == 'on') {
                        if (logInfo) {
                            log.info("cmdHandler- $sceneID on request")
                        }
                        this.sceneSnap(sceneID, false)
                        stateMapsOK = this.setScene(sceneID, true, false)
                    } else {
                        if (event.value == 'off' && cmd == 'restore') {
                            if (logInfo) {
                                log.info("cmdHandler- $sceneID off with restore request")
                            }
                            stateMapsOK = this.setScene(sceneID, false, true)
                        } else {
                            if (event.value == 'off') {
                                if (logInfo) {
                                    log.info("cmdHandler- $sceneID off request")
                                }
                                this.setScene(sceneID, false, false)
                            } else {
                                console.log('last man standing')
                            }
                        }
                    }
                }
                if (!stateMapsOK) {
                    log.warn(state.mapsCheck.replace('sceneSwitchName', event.displayName))
                    callingSwitch.warn()
                }
            

	})
