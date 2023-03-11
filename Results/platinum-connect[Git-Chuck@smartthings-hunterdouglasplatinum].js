
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('doDeviceSync', delay);

    })

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                console.log('Doing Platinum Gateway Device Sync!')
                if (!state.subscribe) {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                    state.subscribe = true
                }
                if (statusURL) {
                    try {
                        this.httpGet(statusURL, { let resp ->
                            resp.headers.each({ 
                                console.log("${it.name} : ${it.value}")
                            })
                            console.log("response contentType: ${resp.contentType}")
                            if (resp.status == 200) {
                                state.statusText = resp.data
                            }
                        })
                    } 
                    catch (let e) {
                        log.error("something went wrong: $e")
                    } 
                }
                this.updateStatus()
            

	})
