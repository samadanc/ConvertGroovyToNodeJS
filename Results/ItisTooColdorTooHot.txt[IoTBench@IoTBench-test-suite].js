
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('Which Sensor?');
            section.numberSetting('minTemp').name('Minimum Temperature');
            section.numberSetting('maxTemp').name('Maximum Temperature');

        });


        page.section('Notification  (optional)', section => {
            section.numberSetting('interval1').name('Interval?');

        });


        page.section('Power outlet(s)  (optional)', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which outlet(s)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("Temperature: ${event.value}, $evt")
        let textAlert = null
        if (event.doubleValue < minTemp ) {
        textAlert = "${temperatureSensor1.label} is below the minimum threshold ($minTemp), reporting a temperature of ${event.value}${event.unit}."
        state.alarmActiveCurrent = true
        } else {
        if (event.doubleValue > maxTemp ) {
        textAlert = "${temperatureSensor1.label} is above the maximum threshold ($maxTemp), reporting a temperature of ${event.value}${event.unit}."
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
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
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
        this.sendSms(phone1, "${temperatureSensor1.label} is ok now, reporting a temperature of ${event.value}${event.unit}.")
        } else {
        log.trace('Sending push notification')
        this.sendPush("${temperatureSensor1.label} is ok now, reporting a temperature of ${event.value}${event.unit}.")
        }
        if (switch1) {
        log.trace("Turning off outlets: $switch1")
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', off)
    
        }
        state.alarmActiveLast = false
        state.nextNotif = null
        }
        }
        

	})
