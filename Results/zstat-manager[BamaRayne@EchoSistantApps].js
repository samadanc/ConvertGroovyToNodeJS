
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'echoSistant', 'echoSistantHandler')

    })

    .subscribedEventHandler('appHandler', (context, event) => {
        
                this.scheduleHandler()
                console.log("app event ${event.name}:${event.value} received")
            

	})

    .subscribedEventHandler('echoSistantHandler', (context, event) => {
        
                let result 
                if (!evt) {
                    return null
                }
                log.warn("received event from EchoSistant with data: ${event.data}")
                switch (event.value) {
                    case 'refresh':
                        state.esProfiles = event.jsonData && event.jsonData?.profiles ? event.jsonData.profiles : []
                        break
                    case 'runReport':
                        let profile = event.jsonData
                        result = this.runReport(profile)
                        break
                }
                return result 
            

	})
