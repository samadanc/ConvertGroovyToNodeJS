
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor humidity', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('When humidity drops below', section => {
            section.numberSetting('humidity').name('Humidity?');

        });


        page.section('Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('Toggle plug', section => {
            section.deviceSetting('plug').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

        context.api.schedules.schedule('scheduledTurnOff', delay);

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        log.trace("humidity: ${event.value}, $evt")
        this.triggerOnHumidity(evt)
        

	})
