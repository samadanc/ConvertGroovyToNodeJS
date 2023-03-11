
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Bathroom humidity sensor', section => {
            section.deviceSetting('bathroom').capability(['relativeHumidityMeasurement']).name('Which humidity sensor?');

        });


        page.section('Coffee maker to turn on', section => {
            section.deviceSetting('coffee').capability(['switch']).name('Which switch?');

        });


        page.section('Humidity level to switch coffee on at', section => {
            section.numberSetting('relHum').name('Humidity level?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bathroom, 'relativeHumidityMeasurement', 'humidity', 'coffeeMaker')

    })

    .subscribedEventHandler('coffeeMaker', (context, event) => {
        
        log.info("Humidity value: ${shower.value}")
        if (shower.value.toInteger() > relHum ) {
        
        context.api.devices.sendCommands(context.config.coffee, 'switch', on)
    
        }
        

	})
