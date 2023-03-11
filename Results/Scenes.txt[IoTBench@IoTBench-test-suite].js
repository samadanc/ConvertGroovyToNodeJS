
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I Change To This Mode', section => {

        });


        page.section('Lock these doors', section => {
            section.deviceSetting('lock').capability(['lock']).name('');

        });


        page.section('Unlock these doors', section => {
            section.deviceSetting('unlock').capability(['lock']).name('');

        });


        page.section('Dim These Lights', section => {
            section.deviceSetting('MultilevelSwitch').capability(['switchLevel']).name('');

        });


        page.section('How Bright?', section => {
            section.numberSetting('number').name('Percentage, 0-99');

        });


        page.section('Turn On These Switches', section => {
            section.deviceSetting('switcheson').capability(['switch']).name('');

        });


        page.section('Turn Off These Switches', section => {
            section.deviceSetting('switchesoff').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
