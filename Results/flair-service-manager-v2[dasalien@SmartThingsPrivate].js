
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

    .subscribedEventHandler('rescheduleHandler', (context, event) => {
        
                this.traceEvent(settings.logFilter, "${event.name}: ${event.value}", detailedNotif)
                this.rescheduleIfNeeded()
            

	})

    .subscribedEventHandler('askAlexaMQHandler', (context, event) => {
        
                if (!evt) {
                    return null
                }
                switch (event.value) {
                    case 'refresh':
                        state?.askAlexaMQ = event.jsonData && event.jsonData?.queues ? event.jsonData.queues : []
                        this.traceEvent(settings.logFilter, "askAlexaMQHandler>new refresh value=${event.jsonData}?.queues", detailedNotif, this.get_LOG_INFO())
                        break
                }
            

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>${event.name}=${event.value}", detailedNotif)
                }
                Integer delay = givenInterval ? givenInterval : 10
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - atomicState?.poll['last'] ? atomicState?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago", detailedNotif, this.get_LOG_INFO())
                    this.takeAction()
                }
                if (atomicState?.poll['last'] ? atomicState?.poll['last'] : 0 + delay * 60000 < currentTime ) {
                    this.traceEvent(settings.logFilter, "rescheduleIfNeeded>scheduling takeAction in $delay minutes..", detailedNotif, this.get_LOG_INFO())
                    if (delay >= 5 && delay < 10) {
                        this.runEvery5Minutes(takeAction)
                    } else {
                        if (delay >= 10 && delay < 15) {
                            this.runEvery10Minutes(takeAction)
                        } else {
                            if (delay >= 15 && delay < 30) {
                                this.runEvery15Minutes(takeAction)
                            } else {
                                this.runEvery30Minutes(takeAction)
                            }
                        }
                    }
                }
                if (!evt) {
                    atomicState.poll['rescheduled'] = this.now()
                }
            

	})
