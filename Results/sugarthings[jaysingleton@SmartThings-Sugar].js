
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('CGM Data', section => {
            section.textSetting('jsonUrl').name('Sugarmate External Json URL');

        });


        page.section('Personalization', section => {
            section.textSetting('personName').name('Name');

        });


        page.section('Automations', section => {

        });


        page.section('Audio Devices', section => {
            section.deviceSetting('audioSpeakers').capability(['audioNotification']).name('Audio Devices');

        });


        page.section('Audio Notification for NO DATA', section => {
            section.numberSetting('skipNoDataRefresh').name('Minutes to wait between notification');

        });


        page.section('Audio Notification for URGENT-HIGH', section => {
            section.numberSetting('thresholdTooHigh').name('Set the level at which you don\');
            section.numberSetting('skipTooHighRefresh').name('Minutes to wait between notifications');

        });


        page.section('Audio Notification for URGENT-LOW', section => {
            section.numberSetting('thresholdTooLow').name('Set the level at which you have symptoms of low blood sugar');
            section.numberSetting('skipTooLowRefresh').name('Minutes to wait between notifications');

        });


        page.section('Audio Notification for SINGLE-ARROW DOWN', section => {
            section.numberSetting('thresholdSingleDown').name('CGM level below');
            section.numberSetting('skipSingleDownRefresh').name('Minutes to wait between notifications');

        });


        page.section('Audio Notification for DOUBLE-ARROW DOWN', section => {
            section.numberSetting('thresholdDoubleDown').name('CGM level below');
            section.numberSetting('skipDoubleDownRefresh').name('Minutes to wait until next notification');

        });


    })

    .updated(async (context, updateData) => {

    })
