
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the humidity in this here...', section => {
            section.deviceSetting('monitoredRoom').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Is higher than this room...', section => {
            section.deviceSetting('baseRoom').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('By this amount...', section => {
            section.numberSetting('percentageDifferance').name('Percentage difference');

        });


        page.section('Turn on this switch...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.monitoredRoom, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let monitoredValue = event.value.toDouble()
        
        context.api.devices.sendCommands(context.config.baseRoom, 'relativeHumidityMeasurement', latestValue)
    
        log.info("Monitored value = $monitoredValue - base value = $baseValue - differance = $percentageDifferance")
        if (monitoredValue - baseValue > percentageDifferance ) {
        
        context.api.devices.sendCommands(context.config.switch1, 'switch', on)
    
        }
        

	})
