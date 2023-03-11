
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery3Hours('takeTokenAuto', delay);

        context.api.schedules.runEvery3Hours('registerNotification', delay);

    })

    .scheduledEventHandler('registerNotification', (context, event) => {
        
                if (!state.tryRegisterNotification) {
                    return null
                }
                let usernames = this.getChildUserNames()
                for (let idx = 0; idx < usernames.size(); idx++) {
                    let config = this.getConfigData(usernames[ idx ])
                    try {
                        this.httpPostJson("https://fison67.duckdns.org/wt/registerNotify/${app.id}", config, { let resp ->
                            if (resp.status == 200) {
                                let result = resp.data
                                log.info("Register Notification [${usernames[idx]}] >> $result")
                                state.registerResult = result 
                                if (result.err) {
                                    try {
                                        if (result.err[0] == 'Not allowed user. Ask a fison67') {
                                            state.tryRegisterNotification = false
                                        }
                                    } 
                                    catch (let err) {
                                        log.error(err)
                                    } 
                                    log.warn(result.err)
                                } else {
                                    state.allowedNotificationApp = true
                                    log.info('Success to register notification')
                                }
                            } else {
                                log.warn('Failed to register notification')
                            }
                        })
                    } 
                    catch (let e) {
                        log.warn("Failed to register notification: $e")
                    } 
                }
            

	})

    .scheduledEventHandler('takeTokenAuto', (context, event) => {
        
                console.log('Try to a new Access Token by Refresh Token per 3 hours.')
                let names = []
                let list = this.getChildDevices()
                list.each({ let child ->
                    let dni = child.getDeviceNetworkId()
                    if (dni.startsWith('wt-connector-person-')) {
                        names.add(dni.split('-')[3])
                    }
                })
                names.each({ let name ->
                    this.refreshToken(name)
                })
            

	})
