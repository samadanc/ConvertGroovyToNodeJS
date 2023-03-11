
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Generate daily stats for this ecobee thermostat', section => {

        });


        page.section('Start date for the initial run, format = YYYY-MM-DD', section => {
            section.textSetting('givenStartDate').name('Beginning Date [default=yesterday]');

        });


        page.section('Start time for initial run HH:MM (24HR)', section => {
            section.textSetting('givenStartTime').name('Beginning time [default=00:00]');

        });


        page.section('End date for the initial run = YYYY-MM-DD', section => {
            section.textSetting('givenEndDate').name('End Date [default=today]');

        });


        page.section('End time for the initial run (24HR)', section => {
            section.textSetting('givenEndTime').name('End time [default=00:00]');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Detailed Notifications', section => {
            section.booleanSetting('detailedNotif').name('Detailed Notifications?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

        context.api.schedules.runIn('generateStats', delay);

    })

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
        if (evt) {
        console.log("rescheduleIfNeeded>${event.name}=${event.value}")
        }
        Integer delay = 24 * 60
        BigDecimal currentTime = this.now()
        BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
        }
        if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
        log.info("rescheduleIfNeeded>scheduling dailyRun in $delay minutes..")
        this.schedule('0 0 1 * * ?', dailyRun)
        }
        if (!evt) {
        state.poll['rescheduled'] = this.now()
        }
        

	})
