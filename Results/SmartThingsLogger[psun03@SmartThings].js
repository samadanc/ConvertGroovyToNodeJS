
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('General:', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


        page.section('Server Information:', section => {
            section.textSetting('prefHost').name('Host');
            section.textSetting('prefPort').name('Port');

        });


        page.section('Polling:', section => {
            section.numberSetting('prefSoftPollingInterval').name('Soft-Polling interval (minutes)');

        });


        page.section('System Monitoring:', section => {
            section.booleanSetting('prefLogModeEvents').name('Log Mode Events?');
            section.booleanSetting('prefLogHubProperties').name('Log Hub Properties?');
            section.booleanSetting('prefLogLocationProperties').name('Log Location Properties?');

        });


        page.section('Devices To Monitor:', section => {
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


    })
