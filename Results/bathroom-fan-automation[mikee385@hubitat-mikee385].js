
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('bathroomSensor').capability(['relativeHumidityMeasurement']).name('Bathroom Humidity Sensor');

        });


        page.section('', section => {
            section.deviceSetting('bathroomFan').capability(['switch']).name('Bathroom Fan');
            section.numberSetting('manualRuntime').name('Manual runtime (in minutes)');
            section.numberSetting('maximumRuntime').name('Maximum runtime (in minutes)');

        });


        page.section('Rapid Change', section => {
            section.numberSetting('rapidTime').name('Time period to check for rapid change (in minutes)');

        });


        page.section('Baseline', section => {
            section.deviceSetting('baselineSensor').capability(['relativeHumidityMeasurement']).name('Baseline Humidity Sensor');

        });


        page.section('Threshold', section => {

        });


        page.section('Notifications', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');
            section.textSetting('prefix').name('Message Prefix');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bathroomSensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bathroomFan, 'switch', 'switch', 'switchHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        if (event.value == 'on') {
        this.turnOn()
        } else {
        this.turnOff()
        }
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        state.previousHumidity = state.currentHumidity
        state.currentHumidity = bathroomSensor.currentValue
        this.checkRapidChange()
        this.checkBaseline()
        this.checkThreshold()
        

	})
