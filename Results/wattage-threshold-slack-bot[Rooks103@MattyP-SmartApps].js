
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Device Configuration', section => {
            section.deviceSetting('powerMeter').capability(['powerMeter']).name('Coffee Pot Outlet');

        });


        page.section('Slack Configuration', section => {
            section.textSetting('slackURI').name('Slack Instance');
            section.textSetting('slackChannel').name('Slack Channel');
            section.textSetting('message').name('Finished Message');

        });


        page.section('['mobileOnly': true]', section => {

        });


    })
