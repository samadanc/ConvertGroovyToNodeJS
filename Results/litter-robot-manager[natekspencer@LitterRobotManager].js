
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('reAuth', delay);

    })

    .scheduledEventHandler('reAuth', (context, event) => {
        
                if (!(this.doLogin())) {
                    this.runIn(60 * state.loginAttempt * state.loginAttempt, reAuth)
                    this.getChildDevices().each({ 
                        it.parseUnitStatus(state.credentialStatus, null)
                        it.sendEvent(['name': 'robotStatusText', 'value': state.loginResponse])
                    })
                }
            

	})
