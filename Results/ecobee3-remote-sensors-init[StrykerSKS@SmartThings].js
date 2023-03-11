
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Select the ecobee thermostat', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('Which ecobee thermostat?');

        });


        page.section('Polling ecobee3\'s remote3 sensor(s) at which interval in minutes (range=[15..59],default =30 min.)?', section => {
            section.numberSetting('givenInterval').name('Interval');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        context.api.schedules.runIn('sendNotifDelayNotInRange', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

    })

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
        if (evt) {
        console.log("rescheduleIfNeeded>${event.name}=${event.value}")
        }
        Integer delay = givenInterval ? givenInterval : 30
        BigDecimal currentTime = this.now()
        BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
        }
        if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
        log.info("rescheduleIfNeeded>scheduling takeAction in $delay minutes..")
        this.schedule("0 0/$delay * * * ?", takeAction)
        }
        this.takeAction()
        if (!evt) {
        state.poll['rescheduled'] = this.now()
        }
        

	})
