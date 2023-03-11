
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect this Garage contact sensor', section => {
            section.deviceSetting('garagedoorsensor').capability(['contactSensor']).name('Garage Door Sensor');

        });


        page.section('Which Arduino board to control', section => {
            section.deviceSetting('arduino').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
