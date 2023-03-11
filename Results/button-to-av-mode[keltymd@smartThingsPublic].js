
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these AV Receivers...', section => {
            section.deviceSetting('receivers').capability(['musicPlayer']).name('Which Receivers?');

        });


        page.section('Whenever this button is turned on', section => {
            section.deviceSetting('switches').capability(['momentary']).name('Which button?');

        });


        page.section('With this input...', section => {
            section.textSetting('inputChan').name('Which channel?');
            section.numberSetting('level').name('What volume level?');

        });


    })
