
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('registrationHandler', (context, event) => {
        
                let hubInfo = event.description.split(',').inject([:], { let map, let token ->
                    token.split(':').with({ 
                        map[it[0].trim()] = it[1]
                    })
                    map 
                })
                state.localip = hubInfo.localip
                state.lastRegister = new Date()
                this.sendNotificationEvent("${hub.name} registered in prod with IP: ${hubInfo.localip}")
            

	})
