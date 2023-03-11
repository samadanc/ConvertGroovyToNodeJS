
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature exceeds (default 120 F) ...', section => {
            section.numberSetting('temperatureTooHot').name('Temperature?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Minimum time between messages per device (optional, defaults to every message)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let toohot = temperatureTooHot != null && temperatureTooHot != '' ? temperatureTooHot : 120.0
        if (event.doubleValue >= toohot ) {
        if (frequency) {
        let lastTime = state[event.deviceId]
        log.info(lastTime)
        if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
        this.sendMessage(evt, toohot)
        }
        } else {
        this.sendMessage(evt, toohot)
        }
        }
        

	})
