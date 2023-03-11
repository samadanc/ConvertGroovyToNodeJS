
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('checkError', delay);

        context.api.schedules.runEvery3Hours('cleanStorage', delay);

        context.api.schedules.runEvery3Hours('checkForUpdates', delay);

        context.api.schedules.schedule('getToken', delay);

        context.api.schedules.runEvery10Minutes('hubGetDevices', delay);

    })

    .scheduledEventHandler('checkError', (context, event) => {
        
                if (state.currentError == null || state.currentError == 'none') {
                    log.info("${this.appLabel()} did not find any errors.")
                    if (state.currentError == 'none') {
                        state.currentError = null
                    }
                    return null
                }
                let errMsg = state.currentError.msg
                log.info("Attempting to solve error: $errMsg")
                state.errorCount = state.errorCount + 1
                if (errMsg == 'Token expired' && state.errorCount < 6) {
                    this.sendEvent(['name': 'ErrHandling', 'value': "Handle comms error attempt ${state.errorCount}"])
                    this.getDevices()
                    if (state.currentError == null) {
                        log.info('getDevices successful. apiServerUrl updated and token is good.')
                        return null
                    }
                    log.error("$errMsg error while attempting getDevices. Will attempt getToken")
                    this.getToken()
                    if (state.currentError == null) {
                        log.info('getToken successful. Token has been updated.')
                        this.getDevices()
                        return null
                    }
                } else {
                    log.error('checkError: No auto-correctable errors or exceeded Token request count.')
                }
                log.error("checkError residual: ${state.currentError}")
            

	})

    .scheduledEventHandler('hubGetDevices', (context, event) => {
        
                this.runIn(10, createBridgeError)
                let headers = [:]
                headers.put('HOST', "$bridgeIp:8082")
                headers.put('command', 'pollForDevices')
                this.sendHubCommand(new physicalgraph.device.HubAction(['headers': headers ], null, ['callback': hubExtractDeviceData ]))
            

	})

    .scheduledEventHandler('checkForUpdates', (context, event) => {
        
                let strLatestSmartAppVersion = this.textSmartAppVersion()
                let strLatestDriverVersion = this.textDriverVersion()
                let intMessage = 0
                let strDevVersion = atomicState?.devManVer ? atomicState?.devManVer : [:]
                strDevVersion['devVer'] = strLatestDriverVersion ? strLatestDriverVersion : ''
                atomicState?.devManVer = strDevVersion 
                let childDevices = app.getChildDevices(true)
                childDevices?.each({ 
                    let strTypRawData = it?.currentState('devTyp')?.value?.toString()
                    let strDeviceType = atomicState?.devTyp ? atomicState?.devTyp : [:]
                    strDeviceType['devTyp'] = strTypRawData ? strTypRawData : ''
                    atomicState?.devTyp = strDeviceType 
                    if (atomicState?.devTyp =~ 'Tunable White Bulb') {
                        let strTWBRawData = it?.currentState('devVer')?.value?.toString()
                        let strTWB = atomicState?.devTWBVer ? atomicState?.devTWBVer : [:]
                        strTWB['devVer'] = strTWBRawData ? strTWBRawData : ''
                        atomicState?.devTWBVer = strTWB 
                    }
                    if (atomicState?.devTyp =~ 'Soft White Bulb') {
                        let strSWBRawData = it?.currentState('devVer')?.value?.toString()
                        let strSWB = atomicState?.devSWBVer ? atomicState?.devSWBVer : [:]
                        strSWB['devVer'] = strSWBRawData ? strSWBRawData : ''
                        atomicState?.devSWBVer = strSWB 
                    }
                    if (atomicState?.devTyp =~ 'Color Bulb') {
                        let strCBRawData = it?.currentState('devVer')?.value?.toString()
                        let strCB = atomicState?.devCBVer ? atomicState?.devCBVer : [:]
                        strCB['devVer'] = strCBRawData ? strCBRawData : ''
                        atomicState?.devCBVer = strCB 
                    }
                    if (atomicState?.devTyp =~ 'Plug') {
                        let strPGRawData = it?.currentState('devVer')?.value?.toString()
                        let strPG = atomicState?.devPGVer ? atomicState?.devPGVer : [:]
                        strPG['devVer'] = strPGRawData ? strPGRawData : ''
                        atomicState?.devPGVer = strPG 
                    }
                    if (atomicState?.devTyp =~ 'Energy Monitor Plug') {
                        let strEMPGRawData = it?.currentState('devVer')?.value?.toString()
                        let strEMPG = atomicState?.devEMPGVer ? atomicState?.devEMPGVer : [:]
                        strEMPG['devVer'] = strEMPGRawData ? strEMPGRawData : ''
                        atomicState?.devEMPGVer = strEMPG 
                    }
                    if (atomicState?.devTyp =~ 'Switch') {
                        let strSHRawData = it?.currentState('devVer')?.value?.toString()
                        let strSH = atomicState?.devSHVer ? atomicState?.devSHVer : [:]
                        strSH['devVer'] = strSHRawData ? strSHRawData : ''
                        atomicState?.devSHVer = strSH 
                    }
                    if (atomicState?.devTyp =~ 'Dimming Switch') {
                        let strDSHRawData = it?.currentState('devVer')?.value?.toString()
                        let strDSH = atomicState?.devDSHVer ? atomicState?.devDSHVer : [:]
                        strDSH['devVer'] = strDSHRawData ? strDSHRawData : ''
                        atomicState?.devDSHVer = strDSH 
                    }
                })
                if (atomicState?.devTWBVer =~ null) {
                    atomicState?.devTWBVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devTWBVer
                }
                if (atomicState?.devSWBVer =~ null) {
                    atomicState?.devSWBVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devSWBVer
                }
                if (atomicState?.devCBVer =~ null) {
                    atomicState?.devCBVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devCBVer
                }
                if (atomicState?.devPGVer =~ null) {
                    atomicState?.devPGVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devPGVer
                }
                if (atomicState?.devEMPGVer =~ null) {
                    atomicState?.devEMPGVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devEMPGVer
                }
                if (atomicState?.devSHVer =~ null) {
                    atomicState?.devSHVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devSHVer
                }
                if (atomicState?.devDSHVer =~ null) {
                    atomicState?.devDSHVer = strDevVersion 
                } else {
                    atomicState?.devVerLnk = atomicState?.devDSHVer
                }
                if ("${atomicState?.devManVer}" =~ "${atomicState?.devVerLnk}") {
                    intMessage = 3
                } else {
                    if (userSelectedNotification) {
                        this.sendPush("${this.appLabel()} Device Handlers need to be updated")
                    }
                }
                if ("$strLatestSmartAppVersion" =~ "${this.appVersion()}") {
                    if (intMessage == 3) {
                        intMessage = 2
                    } else {
                        intMessage = 1
                    }
                } else {
                    if (userSelectedNotification) {
                        this.sendPush("${this.appLabel()} needs to be updated")
                    }
                }
            

	})

    .scheduledEventHandler('getToken', (context, event) => {
        
                let hub = location.hubs[0]
                let cmdBody = ['method': 'login', 'params': ['appType': 'Kasa_Android', 'cloudUserName': "$userName", 'cloudPassword': "$userPassword", 'terminalUUID': "${hub.id}"]]
                let getTokenParams = ['uri': 'https://wap.tplinkcloud.com', 'requestContentType': 'application/json', 'contentType': 'application/json', 'headers': ['Accept': 'application/json; version=1, */*; q=0.01'], 'body': new groovy.json.JsonBuilder(cmdBody).toString()]
                this.httpPostJson(getTokenParams, { let resp ->
                    if (resp.status == 200 && resp.data.error_code == 0) {
                        state.TpLinkToken = resp.data.result.token
                        log.info("TpLinkToken updated to ${state.TpLinkToken}")
                        this.sendEvent(['name': 'TokenUpdate', 'value': 'tokenUpdate Successful.'])
                        if (state.currentError != null) {
                            state.currentError = null
                        }
                    } else {
                        if (resp.status != 200) {
                            state.currentError = resp.statusLine
                            this.sendEvent(['name': 'currentError', 'value': resp.data])
                            log.error("Error in getToken: ${state.currentError}")
                            this.sendEvent(['name': 'TokenUpdate', 'value': state.currentError])
                        } else {
                            if (resp.data.error_code != 0) {
                                state.currentError = resp.data
                                this.sendEvent(['name': 'currentError', 'value': resp.data])
                                log.error("Error in getToken: ${state.currentError}")
                                this.sendEvent(['name': 'TokenUpdate', 'value': state.currentError])
                            }
                        }
                    }
                })
            

	})

    .scheduledEventHandler('cleanStorage', (context, event) => {
        
                atomicState?.devManVer = null
                atomicState?.devTWBVer = null
                atomicState?.devSWBVer = null
                atomicState?.devCBVer = null
                atomicState?.devPGVer = null
                atomicState?.devEMPGVer = null
                atomicState?.devSHVer = null
                atomicState?.devDSHVer = null
                atomicState?.devVerLnk = null
            

	})
