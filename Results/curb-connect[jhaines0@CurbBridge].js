
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('doPoll', delay);

        context.api.schedules.runEvery5Minutes('getHistorical', delay);

        context.api.schedules.runEvery3Hours('refreshAuthToken', delay);

    })

    .scheduledEventHandler('refreshAuthToken', (context, event) => {
        
                console.log('refreshing auth token')
                if (!atomicState.refreshToken) {
                    log.warn('Can not refresh OAuth token since there is no refreshToken stored')
                } else {
                    let tokenParams = ['grant_type': 'refresh_token', 'client_id': curbClientId , 'client_secret': curbClientSecret , 'refresh_token': atomicState.refreshToken]
                    this.httpPostJson(['uri': curbTokenUrl , 'body': tokenParams ], { let resp ->
                        console.log("response contentType: ${resp.contentType}")
                        console.log("Got POST response (refresh): ${resp.data}")
                        atomicState.authToken = resp.data.access_token
                    })
                }
            

	})

    .scheduledEventHandler('getHistorical', (context, event) => {
        
                console.log('Getting Historical')
                let params = ['uri': 'https://app.energycurb.com', 'path': "/api/historical/${atomicState.location}/24h/5m", 'headers': ['Authorization': "Bearer ${atomicState.authToken}"], 'requestContentType': 'application/json']
                asynchttp_v1.get(processHistorical, params)
            

	})

    .scheduledEventHandler('doPoll', (context, event) => {
        
                this.getUsage()
                let period = 60.0 / settings.samplesPerMinute
                let count = data.cycles
                count = count - 1
                if (count > 0) {
                    this.runIn(period, doPoll, ['data': ['cycles': count ]])
                }
            

	})
