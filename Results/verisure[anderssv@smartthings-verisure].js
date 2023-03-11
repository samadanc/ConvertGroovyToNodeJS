
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkPeriodically', delay);

    })

    .scheduledEventHandler('checkPeriodically', (context, event) => {
        
                this.debug('transaction', ' ===== START_UPDATE')
                state.app_version = '0.6.3'
                state.remoteLogEnabled = remoteLogEnabled 
                state.logUrl = logUrl 
                state.logToken = logToken 
                this.debug('checkPeriodically', 'Periodic check from timer')
                if (enabled != null && !enabled) {
                    this.debug('checkPeriodically', 'Not updating status as alarm is disabled in settings.')
                    return null
                } else {
                    if (state.throttleCounter && state.throttleCounter > 0) {
                        this.debug('checkPeriodically', 'Previously got throttling errors, postponing poll another ' + state.throttleCounter + ' minutes.')
                        state.throttleCounter = state.throttleCounter - 1
                        return null
                    }
                }
                if (state.sessionCookie != null) {
                    let timeSinceCookie = new Date().time - Date.parse('yyyy-MM-dd\'T\'HH:mm:ssZ', state.sessionCookieTime).time
                    if (timeSinceCookie > 172800000) {
                        this.debug('checkPeriodically', 'Session cookie gone stale. Baking a new one.')
                        this.resetState()
                    }
                }
                if (state.sessionCookie == null || state.installationId == null) {
                    try {
                        this.loginAndUpdateStates()
                    } 
                    catch (Exception e) {
                        this.error('checkPeriodically', 'Error logging in and getting session cookie.', e)
                    } 
                } else {
                    this.debug('checkPeriodically', "Session cookie already initialised. Time of initialisation: ${state.sessionCookieTime}")
                    this.fetchStatusFromServer(state.sessionCookie, state.installationId)
                }
            

	})
