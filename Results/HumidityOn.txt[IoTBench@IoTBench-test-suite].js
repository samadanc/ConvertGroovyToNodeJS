
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When humidity gets...', section => {
            section.enumSetting('comparison').name('lower/higher than');
            section.numberSetting('limit').name('Limit (in percentage)');
            section.deviceSetting('humid').capability(['relativeHumidityMeasurement']).name('with sensor');

        });


        page.section('React...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Turn a thing');
            section.enumSetting('onoff').name('on/off');
            section.booleanSetting('notify').name('Push notification');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humid, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        console.log("Humidity: ${event.value}, ${event.unit}, ${event.name}, $evt")
        BigDecimal humidityNum = new BigDecimal(event.value.trim().replace('%', ''))
        if (comparison == 'lower' && humidityNum <= limit ) {
        console.log('Humidity lower than limit,')
        if (switches) {
        this.turnSwitch()
        }
        if (notify) {
        this.sendPush("Alert: Current humidity is ${event.value}")
        }
        } else {
        if (comparison == 'higher' && humidityNum >= limit ) {
        console.log('Humidity higher than limit,')
        if (switches) {
        this.turnSwitch()
        }
        if (notify) {
        this.sendPush("Alert: Current humidity is ${event.value}")
        }
        } else {
        console.log('Humidity within parameters.')
        }
        }
        

	})
