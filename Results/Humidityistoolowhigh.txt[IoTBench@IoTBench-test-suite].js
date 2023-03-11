
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Humidity', section => {
            section.deviceSetting('HumiditySensor1').capability(['relativeHumidityMeasurement']).name('Which Sensor?');
            section.numberSetting('minHumid').name('Minimum Humidity');
            section.numberSetting('maxHumid').name('Maximum Humidity');

        });


        page.section('Notification  (optional)', section => {
            section.numberSetting('interval1').name('Interval?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.HumiditySensor1, 'relativeHumidityMeasurement', 'Humidity', 'HumidityHandler')

    })

    .subscribedEventHandler('HumidityHandler', (context, event) => {
        
        console.log("Humidity: ${event.value}, $evt")
        let textAlert = null
        if (Double.parseDouble(event.value.replace('%', '')) < minHumid ) {
        textAlert = "${HumiditySensor1.label} is below $minHumid), reporting Humidity of ${event.value}."
        state.alarmActiveCurrent = true
        } else {
        if (Double.parseDouble(event.value.replace('%', '')) > maxHumid ) {
        textAlert = "${HumiditySensor1.label} is above($maxHumid), reporting Humidity of ${event.value}."
        state.alarmActiveCurrent = true
        } else {
        state.alarmActiveCurrent = false
        }
        }
        console.log("alarmActiveLast: ${state.alarmActiveLast} | alarmActiveCurrent: ${state.alarmActiveCurrent} | nextNotif: ${state.nextNotif}")
        if (state.alarmActiveCurrent) {
        console.log("$textAlert")
        if (!state.alarmActiveLast) {
        if (phone1) {
        log.trace("Sending SMS to $phone1")
        this.sendSms(phone1, "$textAlert")
        } else {
        log.trace('Sending push notification')
        this.sendPush("$textAlert")
        }
        if (switch1) {
        log.trace("Turning on outlets: $switch1")
        switch1.on()
        }
        state.nextNotif = new Date(0)
        state.nextNotif = this.now() + 1000 * 60 * interval1
        state.alarmActiveLast = true
        } else {
        console.log("Checking the nofification interval: $interval1 minutes")
        let currentDateTime = new Date(0)
        currentDateTime = this.now()
        if (state.nextNotif < currentDateTime ) {
        console.log("Current time is $currentDateTime")
        if (phone1) {
        log.trace("Sending SMS to $phone1")
        this.sendSms(phone1, "$textAlert")
        } else {
        log.trace('Sending push notification')
        this.sendPush("$textAlert")
        }
        state.nextNotif = new Date(0)
        state.nextNotif = this.now() + 1000 * 60 * interval1
        }
        }
        } else {
        if (state.alarmActiveLast) {
        console.log('We recover from an alarm')
        if (phone1) {
        log.trace("Sending SMS to $phone1")
        this.sendSms(phone1, "${HumiditySensor1.label} is ok now, reporting humidity of ${event.value}.")
        } else {
        log.trace('Sending push notification')
        this.sendPush("${HumiditySensor1.label} is ok now, reporting a humidity of ${event.value}.")
        }
        state.alarmActiveLast = false
        state.nextNotif = null
        }
        }
        

	})
