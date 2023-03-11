
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.enumSetting('mode').name('Set thermostat mode to');

        });


        page.section('', section => {

        });


        page.section('When home during the day,', section => {

        });


        page.section('When home at night', section => {

        });


        page.section('When away', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Get temperature readings from these sensors');
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Get humidity readings from these sensors');

        });


        page.section('', section => {
            section.deviceSetting('coolOutlets').capability(['switch']).name('Control these switches when cooling');
            section.deviceSetting('heatOutlets').capability(['switch']).name('Control these switches when heating ');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('evtHandler', (context, event) => {
        
        let temp = this.getReadings('temperature')
        log.info("Temp: $temp")
        let humidity = this.getReadings('humidity')
        log.info("Humidity: $humidity")
        let feelsLike = this.getFeelsLike(temp, humidity)
        log.info("Feels Like: $feelsLike")
        this.setSetpoint(feelsLike)
        

	})
