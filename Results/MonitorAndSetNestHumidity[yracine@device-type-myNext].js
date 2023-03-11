
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (!evt) {
                    return null
                }
                switch (event.value) {
                    case 'refresh':
                        state?.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                        console.log("askAlexaMQHandler>new refresh value=${event.jsonData}?.queues")
                        break
                }
            

	})

    .subscribedEventHandler('onHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                this.setHumidityLevel()
            

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                if (dehumidifySwitches) {
                    if (detailedNotif) {
                        log.trace('turning off all dehumidify/fan switches')
                    }
                    dehumidifySwitches.off()
                }
                if (humidifySwitches) {
                    if (detailedNotif) {
                        log.trace('turning off all humidify/fan switches')
                    }
                    humidifySwitches.off()
                }
            

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    console.log("rescheduleIfNeeded>${event.name}=${event.value}")
                }
                java.lang.Integer delay = givenInterval ? givenInterval : 59
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
                }
                if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime ) {
                    log.info("rescheduleIfNeeded>scheduling setHumidityLevel in $delay minutes..")
                    this.schedule("0 0/$delay * * * ?", setHumidityLevel)
                    this.setHumidityLevel()
                }
                if (!evt) {
                    state.poll['rescheduled'] = this.now()
                }
            

	})
