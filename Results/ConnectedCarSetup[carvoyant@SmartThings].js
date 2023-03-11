
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refreshToken', delay);

    })

    .scheduledEventHandler('refreshToken', (context, event) => {
        
                let body = ['client_id': appSettings.carvoyantClientId, 'client_secret': appSettings.carvoyantSecret, 'grant_type': 'refresh_token', 'refresh_token': state.carvoyantRefreshToken]
                try {
                    let userPass = appSettings.carvoyantClientId + ':' + appSettings.carvoyantSecret
                    this.httpPostJson(['uri': appSettings.carvoyantTokenUrl, 'headers': ['Authorization': 'Basic ' + userPass.encodeAsBase64().toString(), 'Content-Type': 'application/x-www-form-urlencoded'], 'body': this.toQueryString(body)], { let response ->
                        console.log(response.getData())
                        state.carvoyantRefreshToken = response.getData().refresh_token
                        state.carvoyantAccessToken = response.getData().access_token
                        console.log(state.carvoyantAccessToken)
                        console.log(state.carvoyantRefreshToken)
                    })
                } 
                catch (HttpResponseException hre) {
                    console.log(hre.getResponse().getData())
                } 
            

	})
