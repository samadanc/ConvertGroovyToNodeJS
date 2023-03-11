
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('takeTokenAuto', delay);

    })

    .scheduledEventHandler('takeTokenAuto', (context, event) => {
        
                console.log('Try to a new Access Token by Refresh Token per 1 hours.')
                try {
                    this.httpPost('https://kauth.kakao.com/oauth/token', 'grant_type=refresh_token&client_id=' + settings.client_id + '&refresh_token=' + state._refresh_token, { let resp ->
                        this.processToken(resp)
                    })
                } 
                catch (let e) {
                    console.log("getAccessToken >> something went wrong: $e")
                } 
            

	})
