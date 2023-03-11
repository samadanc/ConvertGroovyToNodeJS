
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I touch the app turn these lights off…', section => {
            section.deviceSetting('switchesoff').capability(['switch']).name('');

        });


        page.section('When I touch the app turn these lights on…', section => {
            section.deviceSetting('switcheson').capability(['switch']).name('');

        });


        page.section('Lock theses locks...', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('And change to this mode...', section => {

        });


        page.section('After so many seconds (optional)', section => {
            section.numberSetting('waitfor').name('Off after (default 120)');

        });


    })

    .updated(async (context, updateData) => {

    })
