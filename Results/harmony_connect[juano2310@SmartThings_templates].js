
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('discovery', delay);

    })

    .scheduledEventHandler('discovery', (context, event) => {
        
                let Params = ['auth': state.HarmonyAccessToken]
                let url = "https://home.myharmony.com/cloudapi/activity/all?${this.toQueryString(Params)}"
                try {
                    this.httpGet(['uri': url , 'headers': ['Accept': 'application/json']], { let response ->
                        if (response.status == 200) {
                            console.log('valid Token')
                            state.Harmonydevices = response.data
                        }
                    })
                } 
                catch (groovyx.net.http.HttpResponseException e) {
                    if (e.statusCode == 401) {
                        state.remove('HarmonyAccessToken')
                        log.warn('Harmony Access token has expired')
                    }
                } 
                catch (java.net.SocketTimeoutException e) {
                    log.warn('Connection timed out, not much we can do here')
                } 
                this.getActivityList()
                this.poll()
                return null
            

	})
