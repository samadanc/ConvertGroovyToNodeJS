
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getToken', delay);

        context.api.schedules.runEvery5Minutes('checkToken', delay);

    })

    .scheduledEventHandler('getToken', (context, event) => {
        
                state.currentError = null
                let hub = location.hubs[0]
                let cmdBody = ['method': 'login', 'params': ['appType': 'Kasa_Android', 'cloudUserName': "$userName", 'cloudPassword': "$userPassword", 'terminalUUID': "${hub.id}"]]
                log.info("Sending token request with userName: $userName and userPassword:  $userPassword")
                let getTokenParams = ['uri': 'https://wap.tplinkcloud.com', 'requestContentType': 'application/json', 'contentType': 'application/json', 'headers': ['Accept': 'application/json; version=1, */*; q=0.01'], 'body': new groovy.json.JsonBuilder(cmdBody).toString()]
                this.httpPostJson(getTokenParams, { let resp ->
                    if (resp.status == 200 && resp.data.error_code == 0) {
                        state.TpLinkToken = resp.data.result.token
                        log.info("TpLinkToken updated to ${state.TpLinkToken}")
                        this.sendEvent(['name': 'TokenUpdate', 'value': 'getToken Successful'])
                    } else {
                        if (resp.status != 200) {
                            state.currentError = resp.statusLine
                            log.error("Error in getToken: ${state.currentError}")
                            this.sendEvent(['name': 'TokenUpdate', 'value': state.currentError])
                        } else {
                            if (resp.data.error_code != 0) {
                                state.currentError = resp.data
                                log.error("Error in getToken: ${state.currentError}")
                                this.sendEvent(['name': 'TokenUpdate', 'value': 'getToken Failure'])
                            }
                        }
                    }
                })
            

	})

    .scheduledEventHandler('checkToken', (context, event) => {
        
                if (state.currentError != null) {
                    this.sendEvent(['name': 'TokenUpdate', 'value': 'Updating from checkToken'])
                    log.error('checkToken attempting to update token due to error')
                    this.getToken()
                }
            

	})
