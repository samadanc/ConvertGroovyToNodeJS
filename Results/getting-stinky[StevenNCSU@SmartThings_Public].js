
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Sensor to indicate cleaning...', section => {
            section.deviceSetting('cleanSensor').capability(['contactSensor']).name('Where?');

        });


        page.section('Report stink level at...', section => {
            section.timeSetting('time1').name('When?');

        });


        page.section('Send stink level to...', section => {

        });


    })
