
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Control these AV Receivers...', section => {
            section.deviceSetting('receivers').capability(['musicPlayer']).name('Which Receivers?');

        });


        page.section('Whenever this switch is activated', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which switches?');

        });


        page.section('Or whenever this motion is activated', section => {
            section.deviceSetting('motions').capability(['motionSensor']).name('Which motions?');

        });


        page.section('Or when switching to these modes', section => {

        });


        page.section('With this input...', section => {
            section.textSetting('inputChan').name('Which channel?');
            section.textSetting('level').name('What volume level?');

        });


    })
