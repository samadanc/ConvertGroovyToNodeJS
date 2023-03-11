
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
            section.deviceSetting('valve_main').capability(['switch']).name('Main valve');
            section.deviceSetting('valve01').capability(['switch']).name('Zone one valve');
            section.textSetting('valve01_first').name('Zone one morning run');
            section.textSetting('valve01_second').name('Zone one evening run');
            section.deviceSetting('valve02').capability(['switch']).name('Zone two valve');
            section.textSetting('valve02_first').name('Zone two morning run');
            section.textSetting('valve02_second').name('Zone two evening run');
            section.deviceSetting('valve03').capability(['switch']).name('Zone Three valve');
            section.textSetting('valve03_first').name('Zone Three morning run');
            section.textSetting('valve03_second').name('Zone Three evening run');
            section.deviceSetting('valve04').capability(['switch']).name('Zone Four valve');
            section.textSetting('valve04_first').name('Zone Four morning run');
            section.textSetting('valve04_second').name('Zone Four evening run');
            section.deviceSetting('valve05').capability(['switch']).name('Zone Five valve');
            section.textSetting('valve05_first').name('Zone Five morning run');
            section.textSetting('valve05_second').name('Zone Five evening run');
            section.deviceSetting('valve06').capability(['switch']).name('Zone Six valve');
            section.textSetting('valve06_first').name('Zone Six morning run');
            section.textSetting('valve06_second').name('Zone Six evening run');
            section.deviceSetting('valve07').capability(['switch']).name('Zone Seven valve');
            section.textSetting('valve07_first').name('Zone Seven morning run');
            section.textSetting('valve07_second').name('Zone Seven evening run');
            section.deviceSetting('valve08').capability(['switch']).name('Zone Eight valve');
            section.textSetting('valve08_first').name('Zone Eight morning run');
            section.textSetting('valve08_second').name('Zone Eight evening run');

        });


        page.section('Send Notifications?', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


    })
