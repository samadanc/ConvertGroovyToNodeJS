
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


        page.section('Polling ecobee\'s remote sensor(s) at which interval in minutes (range=[5,10,15,30],default =5 min.)?', section => {
            section.numberSetting('givenInterval').name('Interval');

        });


        page.section('Handle/Notify any exception proactively', section => {
            section.booleanSetting('handleExceptionFlag').name('Handle exceptions proactively?');

        });


        page.section('Watchdogs', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('What do I use as temperature sensor to restart smartapp processing?');
            section.deviceSetting('motionSensor').capability(['motionSensor']).name('What do I use as a motion sensor to restart smartapp processing?');
            section.deviceSetting('energyMeter').capability(['powerMeter']).name('What do I use as energy sensor to restart smartapp processing?');
            section.deviceSetting('powerSwitch').capability(['switch']).name('What do I use as Master on/off switch to restart smartapp processing?');

        });


        page.section('Notifications & Logging', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');
            section.booleanSetting('detailedNotif').name('Detailed Logging & Notifications?');
            section.enumSetting('logFilter').name('log filtering [Level 1=ERROR only,2=<Level 1+WARNING>,3=<2+INFO>,4=<3+DEBUG>,5=<4+TRACE>]?');

        });


        page.section('Enable Amazon Echo/Ask Alexa Notifications [optional, default=false]', section => {
            section.booleanSetting('askAlexaFlag').name('Ask Alexa verbal Notifications?');
            section.enumSetting('listOfMQs').name('List of the Ask Alexa Message Queues (default=Primary)');
            section.numberSetting('AskAlexaExpiresInDays').name('Ask Alexa\');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.tempSensor, 'temperatureMeasurement', 'temperature', 'rescheduleHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSwitch, 'switch', 'switch.off', 'rescheduleHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.powerSwitch, 'switch', 'switch.on', 'rescheduleHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensor, 'motionSensor', 'motion', 'rescheduleHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'askAlexaMQ', 'askAlexaMQHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeter, 'powerMeter', 'energy', 'rescheduleHandler')

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
        break
        }
        

	})

    .subscribedEventHandler('rescheduleIfNeeded', (context, event) => {
        
        if (evt) {
        this.traceEvent(settings.logFilter, "rescheduleIfNeeded>${event.name}=${event.value}", detailedNotif)
        }
        Integer delay = givenInterval ? givenInterval : 5
        BigDecimal currentTime = this.now()
        BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        this.traceEvent(settings.logFilter, "rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago", detailedNotif, this.get_LOG_INFO())
        }
        if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
        this.traceEvent(settings.logFilter, "rescheduleIfNeeded>scheduling takeAction in $delay minutes..", detailedNotif, this.get_LOG_INFO())
        if (delay >= 0 && delay < 10) {
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
        state.poll['rescheduled'] = this.now()
        }
        

	})
