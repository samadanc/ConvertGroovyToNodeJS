
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Evohome:', section => {
            section.textSetting('prefEvohomeUsername').name('Username');
            section.numberSetting('prefEvohomeStatusPollInterval').name('Polling Interval (minutes)');
            section.numberSetting('prefEvohomeUpdateRefreshTime').name('Update Refresh Time (seconds)');
            section.numberSetting('prefThermostatModeDuration').name('Away/Custom/DayOff Mode (days):');
            section.numberSetting('prefThermostatEconomyDuration').name('Economy Mode (hours):');

        });


        page.section('General:', section => {
            section.booleanSetting('prefDebugMode').name('Enable debug logging?');

        });


    })
