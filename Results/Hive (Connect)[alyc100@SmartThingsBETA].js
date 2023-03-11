
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('starting').name('Starting');
            section.timeSetting('ending').name('Ending');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('refreshDevices', delay);

    })

    .subscribedEventHandler('tempHandler', (context, event) => {
        
        let msg
        log.trace("temperature: ${event.value}, $evt")
        if (settings.maxtemp != null) {
        let maxTemp = settings.maxtemp
        if (event.doubleValue >= maxTemp ) {
        msg = "${event.displayName} temperature reading is very hot."
        if (state.maxNotificationSent == null || state.maxNotificationSent == false) {
        this.generateNotification(msg)
        state.maxNotificationSent = true
        }
        } else {
        state.maxNotificationSent = false
        }
        } else {
        if (settings.mintemp != null) {
        let minTemp = settings.mintemp
        if (event.doubleValue <= minTemp ) {
        msg = "${event.displayName} temperature reading is very cold."
        if (state.minNotificationSent == null || state.minNotificationSent == false) {
        this.generateNotification(msg)
        state.minNotificationSent = true
        }
        } else {
        state.minNotificationSent = false
        }
        }
        }
        

	})

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        let msg
        if (event.name == 'maxtempthresholdbreach') {
        msg = "Auto adjusting set temperature of ${event.displayName} as current set temperature of ${event.value}°C is above maximum threshold."
        if (settings.sendMaxThresholdBreach) {
        this.generateNotification(msg)
        }
        }
        

	})

    .subscribedEventHandler('modeHandler', (context, event) => {
        
        let msg
        if (event.value == 'heat') {
        msg = "${event.displayName} is set to Manual"
        if (settings.sendSchedule) {
        this.generateNotification(msg)
        }
        } else {
        if (event.value == 'off') {
        msg = "${event.displayName} is turned Off"
        if (settings.sendOff) {
        this.generateNotification(msg)
        }
        } else {
        if (event.value == 'auto') {
        msg = "${event.displayName} is set to Schedule"
        if (settings.sendManual) {
        this.generateNotification(msg)
        }
        } else {
        if (event.value == 'emergency heat') {
        msg = "${event.displayName} is in Boost mode"
        if (settings.sendBoost) {
        this.generateNotification(msg)
        }
        }
        }
        }
        }
        

	})

    .scheduledEventHandler('refreshDevices', (context, event) => {
        
        log.info('Refreshing all devices...')
        this.getChildDevices().each({ let device ->
        device.refresh()
        })
        

	})
