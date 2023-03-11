
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When ... has been operating', section => {
            section.deviceSetting('ooven').capability(['ovenOperatingState']).name('');

        });


        page.section('For ... minutes', section => {
            section.numberSetting('timer').name('');

        });


        page.section('Set smoke alarm ... to sense smoke', section => {
            section.deviceSetting('smokeAlarm').capability(['alarm']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
