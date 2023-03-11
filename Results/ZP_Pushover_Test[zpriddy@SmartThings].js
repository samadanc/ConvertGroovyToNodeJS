
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Pushover Device', section => {
            section.deviceSetting('pushoverDevice').capability(['notification']).name('');
            section.textSetting('testMessageText').name('Test Message Text');
            section.enumSetting('testMessagePriority').name('Test Message Priority');

        });


    })

    .updated(async (context, updateData) => {

    })
