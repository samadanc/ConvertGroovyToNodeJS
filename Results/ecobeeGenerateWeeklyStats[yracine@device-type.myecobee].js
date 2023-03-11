
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Generate weekly stats for this ecobee thermostat', section => {
            section.deviceSetting('ecobee').capability(['thermostat']).name('MyEcobee?');

        });


        page.section('Date for the initial run = YYYY-MM-DD', section => {
            section.textSetting('givenEndDate').name('End Date [default=today]');

        });


        page.section('Time for the initial run (24HR)', section => {
            section.textSetting('givenEndTime').name('End time [default=00:00]');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Enable Amazon Echo/Ask Alexa Notifications [optional, default=false]', section => {
            section.booleanSetting('askAlexaFlag').name('Ask Alexa verbal Notifications?');
            section.enumSetting('listOfMQs').name('List of the Ask Alexa Message Queues (default=Primary)');
            section.numberSetting('AskAlexaExpiresInDays').name('Ask Alexa\');

        });


        page.section('Logging', section => {
            section.booleanSetting('detailedNotif').name('Detailed logging?');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

        context.api.schedules.runIn('generateStats', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

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

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
        if (evt) {
        console.log("rescheduleIfNeeded>${event.name}=${event.value}")
        }
        Integer delay = 24 * 60
        BigDecimal currentTime = this.now()
        BigDecimal lastPollTime = currentTime - atomicState?.poll['last'] ? atomicState?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
        }
        if (atomicState?.poll['last'] ? atomicState?.poll['last'] : 0 + delay * 60000 < currentTime ) {
        log.info("rescheduleIfNeeded>scheduling dailyRun in $delay minutes..")
        this.schedule('0 15 0 * * ?', dailyRun)
        }
        if (!evt) {
        atomicState?.poll['rescheduled'] = this.now()
        }
        

	})
