
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('getKwhData', delay);

    })

    .scheduledEventHandler('getKwhData', (context, event) => {
        
                console.log("Getting kwh data at ${settings.curbLocation} with token: ${state.authToken}")
                let url = "/api/aggregate/${settings.curbLocation}/"
                if (settings.energyInterval == 'Hour') {
                    url = url + '1h/m'
                }
                if (settings.energyInterval == 'Billing Period') {
                    url = url + 'billing/h'
                }
                if (settings.energyInterval == 'Half Hour') {
                    url = url + '30m/m'
                }
                if (settings.energyInterval == 'Day') {
                    url = url + '24h/h'
                }
                if (settings.energyInterval == 'Fifteen Minutes') {
                    url = url + '15m/m'
                }
                console.log("KWH FOR: $url")
                let params = ['uri': 'https://app.energycurb.com', 'path': url , 'headers': ['Authorization': "Bearer ${state.authToken}"], 'requestContentType': 'application/json']
                try {
                    this.httpGet(params, { let resp ->
                        this.processData(resp, null, false, true)
                        return null
                    })
                } 
                catch (let e) {
                    this.refreshAuthToken()
                    log.error("something went wrong: $e")
                } 
            

	})
