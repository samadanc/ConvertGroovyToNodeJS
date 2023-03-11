
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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('rescheduleHandler', (context, event) => {
        
                console.log("${event.name}: ${event.value}")
                this.rescheduleIfNeeded()
            

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
                if (evt) {
                    console.log("rescheduleIfNeeded>${event.name}=${event.value}")
                }
                Integer delay = givenInterval ? givenInterval : 5
                BigDecimal currentTime = this.now()
                BigDecimal lastPollTime = currentTime - atomicState?.poll['last'] ? atomicState?.poll['last'] : 0
                if (lastPollTime != currentTime ) {
                    Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
                    log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
                }
                if (atomicState?.poll['last'] ? atomicState?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
                    log.info("rescheduleIfNeeded>scheduling takeAction in $delay minutes..")
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
                    this.takeAction()
                }
                if (!evt) {
                    atomicState.poll['rescheduled'] = this.now()
                }
            

	})
