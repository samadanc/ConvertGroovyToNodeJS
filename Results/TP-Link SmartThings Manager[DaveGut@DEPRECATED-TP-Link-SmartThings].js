
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getToken', delay);

        context.api.schedules.runEvery15Minutes('hubGetDevices', delay);

        context.api.schedules.runEvery5Minutes('checkError', delay);

    })

    .scheduledEventHandler('getToken', (context, event) => {
        
                this.traceLog("getToken $userName")
                state.flowType = null
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

    .scheduledEventHandler('checkError', (context, event) => {
        
                if (state.currentError == null || state.currentError == 'none') {
                    log.info('No errors detected.')
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
        
                this.hubSendCommand('pollForDevices')
            

	})
