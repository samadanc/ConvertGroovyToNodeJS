
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Auto-Lock...', section => {
            section.deviceSetting('contact0').capability(['contactSensor']).name('Which door?');
            section.deviceSetting('lock0').capability(['lock']).name('Which lock?');
            section.numberSetting('autolock_delay').name('Delay for auto-Lock after door is closed? (Seconds)');
            section.numberSetting('relock_delay').name('Delay for re-lock w/o opening door? (Seconds)');
            section.numberSetting('leftopen_delay').name('Notify if door open for X seconds.');
            section.numberSetting('offset').name('Lock this many minutes after sunset');
            section.enumSetting('push_enabled').name('Enable NORMAL push notifications?');
            section.enumSetting('debug_notify').name('Enable DEBUG push notifications?');
            section.enumSetting('phone_debug_enabled').name('Enable DEBUG push to phone?');

        });


    })
