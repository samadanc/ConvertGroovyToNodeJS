
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getToken', delay);

        context.api.schedules.runEvery5Minutes('checkError', delay);

    })

    .scheduledEventHandler('getToken', (context, event) => {
        
                let hub = location.hubs[0]
                let headers = [:]
                headers.put('Content-Type', 'application/json')
                let hash = this.generateMD5(userPassword)
                let getTokenParams = ['uri': 'https://smartapi.vesync.com/vold/user/login', 'HOST': 'smartapi.vesync.com', 'body': '{"account": "' + userName + '","password": "' + hash + '"}', 'requestContentType': 'application/json', 'contentType': 'application/json']
                log.trace('Getting device token')
                this.httpPost(getTokenParams, { let resp ->
                    if (resp.status == 200 && resp.data.tk != null) {
                        state.Token = resp.data.tk
                        state.ID = resp.data.accountID
                        log.info("Token updated to ${state.Token}, account id ${state.ID}")
                        this.sendEvent(['name': 'TokenUpdate', 'value': 'tokenUpdate Successful.'])
                        state.currentError = null
                    } else {
                        if (resp.status != 200) {
                            state.currentError = resp.statusLine
                            log.error("Error in getToken: ${state.currentError}")
                            this.sendEvent(['name': 'TokenUpdate', 'value': state.currentError])
                        } else {
                            if (resp.data.error_code != 0) {
                                state.currentError = resp.data
                                log.error("Error in getToken: ${state.currentError}")
                                this.sendEvent(['name': 'TokenUpdate', 'value': state.currentError])
                            }
                        }
                    }
                })
            

	})

    .scheduledEventHandler('checkError', (context, event) => {
        
                if (state.currentError == null) {
                    log.info('VeSync did not have any set errors.')
                    return null
                }
                let errMsg = state.currentError.msg
                log.info("Attempting to solve error: $errMsg")
                state.errorCount = state.errorCount + 1
                if (errMsg == 'Token expired' && state.errorCount < 6) {
                    this.sendEvent(['name': 'ErrHandling', 'value': "Handle comms error attempt ${state.errorCount}"])
                    this.getDevices()
                    if (state.currentError == null) {
                        log.info('getDevices successful.  apiServerUrl updated and token is good.')
                        return null
                    }
                    log.error("$errMsg error while attempting getDevices.  Will attempt getToken")
                    this.getToken()
                    if (state.currentError == null) {
                        log.info('getToken successful.  Token has been updated.')
                        this.getDevices()
                        return null
                    }
                } else {
                    log.error('checkError:  No auto-correctable errors or exceeded Token request count.')
                }
                log.error("checkError residual:  ${state.currentError}")
            

	})
