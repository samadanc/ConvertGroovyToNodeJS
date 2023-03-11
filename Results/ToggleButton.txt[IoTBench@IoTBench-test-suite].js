
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When I push a button on this remote', section => {
            section.deviceSetting('button').capability(['button']).name('Button');

        });


        page.section('Which button:', section => {
            section.numberSetting('whichButton').name('');

        });


        page.section('Toggle these switches', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Turn off these switches', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('');

        });


        page.section('Turn on these switches', section => {
            section.deviceSetting('onSwitches').capability(['switch']).name('');

        });


    })
