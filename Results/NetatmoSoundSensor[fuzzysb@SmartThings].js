
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('This Netatmo Base Station', section => {

        });


        page.section('Threshold', section => {
            section.numberSetting('threshold').name('Threshold in db');

        });


        page.section('This Virtual Switch', section => {
            section.deviceSetting('virtualSwitch').capability(['switch']).name('switch this virtual switch');

        });


    })
