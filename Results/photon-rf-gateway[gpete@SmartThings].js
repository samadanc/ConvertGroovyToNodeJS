
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery30Minutes('checkAndPopulateParticleToken', delay);

    })

    .scheduledEventHandler('checkAndPopulateParticleToken', (context, event) => {
        
                console.log('Checking particle token...')
                try {
                    this.httpGet("${state.particleAPIUri}/devices?access_token=${state.particleToken}")
                } 
                catch (groovyx.net.http.HttpResponseException ex) {
                    if (ex.response.status == 200) {
                        console.log('Particle token ok')
                    } else {
                        if (ex.response.status == 401) {
                            console.log('Particle returned 401 Unauthorized. Removing old token...')
                            this.deleteAccessToken()
                            console.log('Attempting to populate new particleToken...')
                            try {
                                this.populateParticleToken()
                                console.log('Success!')
                            } 
                            catch (let all) {
                                console.log('Failed!')
                            } 
                        }
                    }
                } 
            

	})
