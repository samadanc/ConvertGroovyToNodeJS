
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these presence sensors arrive or leave...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('When away...', section => {
            section.deviceSetting('awayOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('awayOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('When at home with daylight...', section => {
            section.deviceSetting('dayOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('dayOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('When at home without daylight...', section => {
            section.deviceSetting('nightOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('nightOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('Monitor illuminance sensor', section => {
            section.deviceSetting('lightSensor').capability(['illuminanceMeasurement']).name('Sensor(s)?');
            section.numberSetting('lightOnValue').name('On at < (Lux, empty = 100)?');
            section.numberSetting('lightOffValue').name('Off at > (Lux, empty = 150)?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.lightSensor, 'illuminanceMeasurement', 'illuminance', 'illuminanceHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })
