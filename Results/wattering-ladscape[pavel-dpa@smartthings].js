
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Timers', section => {
            section.booleanSetting('Sunrize_Sunset_check').name('Would you like use sunerise and sunset?');
            section.booleanSetting('Sunrize_check_info').name('Would you like use sunerise?');
            section.booleanSetting('Sunset_check_info').name('Would you like use suneset?');
            section.numberSetting('Sunrize_delay').name('Sunrize delay');
            section.numberSetting('Sunset_delay').name('Sunset delay');

        });


        page.section('Timers', section => {
            section.timeSetting('start_before_W').name('First end (normally 4:30AM)');
            section.timeSetting('start_after_W').name('Second start (21:50AM )');

        });


        page.section('Valves to adjust...', section => {
            section.deviceSetting('valve_main').capability(['switch']).name('');
            section.deviceSetting('valve01').capability(['switch']).name('');
            section.numberSetting('valve01_Timer').name('Zone One time');
            section.numberSetting('valve01_count').name('Zone One count');
            section.deviceSetting('valve02').capability(['switch']).name('');
            section.numberSetting('valve02_Timer').name('Zone Two time');
            section.numberSetting('valve02_count').name('Zone Two count');
            section.deviceSetting('valve03').capability(['switch']).name('');
            section.numberSetting('valve03_Timer').name('Zone Three time');
            section.numberSetting('valve03_count').name('Zone Three count');
            section.deviceSetting('valve04').capability(['switch']).name('');
            section.numberSetting('valve04_Timer').name('Zone Four');
            section.numberSetting('valve04_count').name('Zone Four count');
            section.deviceSetting('valve05').capability(['switch']).name('');
            section.numberSetting('valve05_Timer').name('Zone Five');
            section.numberSetting('valve05_count').name('Zone Five count');
            section.deviceSetting('valve06').capability(['switch']).name('');
            section.numberSetting('valve06_Timer').name('Zone Six');
            section.numberSetting('valve06_count').name('Zone Six count');
            section.deviceSetting('valve07').capability(['switch']).name('');
            section.numberSetting('valve07_Timer').name('Zone Seven');
            section.numberSetting('valve07_count').name('Zone Seven count');
            section.deviceSetting('valve08').capability(['switch']).name('');
            section.numberSetting('valve08_Timer').name('Zone Eight');
            section.numberSetting('valve08_count').name('Zone Eight count');

        });


        page.section('Send Notifications?', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


    })
