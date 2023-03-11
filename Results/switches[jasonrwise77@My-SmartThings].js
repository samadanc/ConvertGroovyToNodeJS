
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Main switch,...', section => {
            section.deviceSetting('mainswitch').capability(['switch']).name('');

        });


        page.section('additional switches...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Take action when On, Off or Both:', section => {
            section.enumSetting('type').name('Select when to link action, for:');

        });


        page.section('Control Direction:', section => {
            section.enumSetting('direction').name('ontomany (main switch controls others)\nmanytoone (main switch is on if any others on)\nsynced (main is both controlled and controls)\nonetomanyoff main on turns only one switch on');

        });


        page.section('one on switch,...', section => {
            section.deviceSetting('oneonswitch').capability(['switch']).name('');

        });


    })
