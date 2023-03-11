
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I touch the app turn these lights off', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('And change to this mode...', section => {

        });


        page.section('After so many minutes (optional)', section => {
            section.numberSetting('waitfor').name('Off after (default 2)');

        });


    })

    .updated(async (context, updateData) => {

    })
