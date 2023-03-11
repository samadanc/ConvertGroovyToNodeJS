
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there is wired-power loss on...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('Via a push notification and a text message(optional)', section => {
            section.enumSetting('pushAndPhone').name('Send Text?');

        });


        page.section('Make changes to the following when powered is restored...', section => {
            section.deviceSetting('offSwitches').capability(['switch']).name('Turn these off');
            section.deviceSetting('onSwitches').capability(['switch']).name('Turn these on if after sunset');

        });


    })
