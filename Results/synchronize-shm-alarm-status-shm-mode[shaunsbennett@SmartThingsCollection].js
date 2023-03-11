
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select your button devices (optional)', section => {
            section.deviceSetting('buttonDeviceAway').capability(['button']).name('SHM Away, Mode Away');
            section.deviceSetting('buttonDeviceStay').capability(['button']).name('SHM Stay, Mode Night');
            section.deviceSetting('buttonDeviceDisarm').capability(['button']).name('SHM Disarm, Mode Home');

        });


        page.section('Options', section => {
            section.booleanSetting('logTrace').name('Log Trace Messages');
            section.numberSetting('buttonDuplicateSeconds').name('Duplicate Button Seconds');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmSystemStatusEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDeviceDisarm, 'button', 'button', 'buttonEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDeviceStay, 'button', 'button', 'buttonEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.buttonDeviceAway, 'button', 'button', 'buttonEvent')

    })

    .subscribedEventHandler('alarmSystemStatusEvent', (context, event) => {
        
        if (logTrace) {
        log.trace("alarmSystemStatusEvent: ${event.name} = ${event.value} (${event.data})")
        }
        this.executeMode(event.value)
        

	})

    .subscribedEventHandler('buttonEvent', (context, event) => {
        
        if (logTrace) {
        log.trace("buttonEvent: ${event.name} = ${event.value} (${event.data})")
        }
        let buttonDevice = event.device
        let value = this.getButtonValue(buttonDevice.id)
        let recentEvents = buttonDevice.eventsSince(new Date(this.now() - buttonDuplicateSeconds * 1000)).findAll({
        it.value == event.value && it.data == event.data
        })
        if (logTrace) {
        log.trace("found ${(recentEvents.size()) ? recentEvents.size() : 0} events in past $buttonDuplicateSeconds seconds")
        }
        if (recentEvents.size <= 1) {
        let buttonNumber = event.data =~ '.*:(.+)}.*'[0][1]
        buttonNumber = buttonNumber ? buttonNumber.replace('"', '').toInteger() : 0
        this.executeButtonHandler(buttonNumber, value)
        

	})

    .subscribedEventHandler('modeEvent', (context, event) => {
        
        if (logTrace) {
        log.trace("modeEvent: ${event.name} = ${event.value} (${event.data})")
        }
        this.executeAlarmSystemStatusHandler(event.value)
        

	})
