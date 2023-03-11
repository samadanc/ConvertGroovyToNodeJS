
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temp - Humidity sensor', section => {
            section.deviceSetting('humiditysensor').capability(['sensor']).name('Select the sensor to monitor:');

        });


        page.section('DeHumidifier Control', section => {
            section.numberSetting('humiditypercent').name('Control at what %');
            section.numberSetting('humidityshutoff').name('Turn off at what %');
            section.deviceSetting('dehumidifier').capability(['switch']).name('Select Dehumidifier');
            section.numberSetting('mintemp').name('Minimum temperature to run dehumidifier (Default 42)');
            section.numberSetting('maxtemp').name('Maximum temperature to run dehumidifier (Default 100)');
            section.deviceSetting('contactsensor').capability(['contactSensor']).name('Door/Window sensor');

        });


    })
