
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


        page.section('Polling ecobee3\'s remote3 sensor(s) at which interval in minutes (range=[5,10,15,30],default =5 min.)?', section => {
            section.numberSetting('givenInterval').name('Interval');

        });


        page.section('Handle/Notify any exception proactively', section => {
            section.booleanSetting('handleExceptionFlag').name('Handle exceptions proactively?');

        });


        page.section('What do I use as Master on/off switch to restart smartapp processing? [optional]', section => {
            section.deviceSetting('powerSwitch').capability(['switch']).name('');

        });


        page.section('What do I use as temperature polling sensor to restart smartapp processing? [optional]', section => {
            section.deviceSetting('tempSensor').capability(['temperatureMeasurement']).name('');

        });


        page.section('What do I use as energy polling sensor to restart smartapp processing? [optional]', section => {
            section.deviceSetting('energyMeter').capability(['powerMeter']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

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

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'rescheduleIfNeeded')

        await context.api.subscriptions.subscribeToDevices(context.config.energyMeter, 'powerMeter', 'energy', 'rescheduleHandler')

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
        BigDecimal lastPollTime = currentTime - state?.poll['last'] ? state?.poll['last'] : 0
        if (lastPollTime != currentTime ) {
        Double lastPollTimeInMinutes = lastPollTime / 60000.toDouble().round(1)
        log.info("rescheduleIfNeeded>last poll was  ${lastPollTimeInMinutes.toString()} minutes ago")
        }
        if (state?.poll['last'] ? state?.poll['last'] : 0 + delay * 60000 < currentTime && this.canSchedule()) {
        log.info("rescheduleIfNeeded>scheduling takeAction in $delay minutes..")
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
