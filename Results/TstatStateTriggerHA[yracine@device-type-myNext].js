
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

    })

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (!evt) {
                    return null
                }
                switch (event.value) {
                    case 'refresh':
                        state?.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                        log.info("askAlexaMQHandler>refresh value=$state?.askAlexaMQ")
                        break
                }
            

	})

    .subscribedEventHandler('thermostatOperatingHandler', (context, event) => {
        
                let msg = "$thermostat has triggered ${event.value} event..."
                if (detailedNotif) {
                    console.log(msg)
                    this.send(msg, settings.askAlexaFlag)
                }
                this.check_event(event.value)
            

	})
