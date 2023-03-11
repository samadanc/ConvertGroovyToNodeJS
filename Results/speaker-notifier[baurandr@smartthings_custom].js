
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select contacts...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Which contact sensor?');
            section.enumSetting('openOrClosed').name('Notify when open or closed?');

        });


        page.section('Select motion sensors...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which motion sensor(s)?');

        });


        page.section('Notify on google home:', section => {
            section.deviceSetting('speaker1').capability(['actuator']).name('Which speaker?');

        });


        page.section('Announce between what times? Both absolute and sun event based times must be true to turn lights on.', section => {
            section.timeSetting('fromTime').name('Start of allowed time window');
            section.timeSetting('toTime').name('End of allowed time window');
            section.numberSetting('onOffset').name('Start of allowed time based on Sunset offset (+ = after, - = before)');
            section.numberSetting('offOffset').name('End of allowed time based on Sunrise offset (+ = after, - = before)');

        });


        page.section('Announce during what modes?', section => {

        });


    })
