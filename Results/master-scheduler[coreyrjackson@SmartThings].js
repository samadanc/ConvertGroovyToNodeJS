
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('People to Watch', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('');

        });


        page.section('Change to this mode to...', section => {

        });


        page.section('Away threshold (defaults to 10 min)', section => {

        });


        page.section('Choose thermostat... 4/3/2016 5:52 PM ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Monday thru Friday Schedule', section => {
            section.timeSetting('time1').name('Wake Time of Day');
            section.numberSetting('tempSetpoint1').name('Wake Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time2').name('Leave Time of Day');
            section.numberSetting('tempSetpoint2').name('Leave Heat Temp Degrees Fahrenheit?');
            section.timeSetting('time3').name('Return Time of Day');
            section.numberSetting('tempSetpoint3').name('Return Heat Degrees Fahrenheit?');
            section.timeSetting('time4').name('Sleep Time of Day');
            section.numberSetting('tempSetpoint4').name('Sleep Heat Degrees Fahrenheit?');

        });


    })
