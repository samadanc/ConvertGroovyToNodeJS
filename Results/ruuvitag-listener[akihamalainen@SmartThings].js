
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('General:', section => {
            section.enumSetting('configLoggingLevelIDE').name('IDE Live Logging Level:\nMessages with this level and higher will be logged to the IDE.');

        });


        page.section('InfluxDB Database:', section => {
            section.textSetting('prefDatabaseHost').name('Host');
            section.textSetting('prefDatabasePort').name('Port');
            section.textSetting('prefDatabaseName').name('Database Name');
            section.textSetting('prefDatabaseUser').name('Username');
            section.textSetting('prefDatabasePass').name('Password');

        });


        page.section('Polling:', section => {
            section.numberSetting('prefSoftPollingInterval').name('Soft-Polling interval (minutes)');

        });


        page.section('Devices To Monitor:', section => {
            section.deviceSetting('ruuviTags').capability(['temperatureMeasurement']).name('RuuviTags');

        });


    })
