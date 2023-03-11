
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose thermostat... ', section => {
            section.deviceSetting('thermostat').capability(['thermostat']).name('');

        });


        page.section('Optionally choose temperature sensor to use instead of the thermostat\'s... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Temp Sensors');

        });


        page.section('Top Level', section => {
            section.enumSetting('runMode').name('Heat/Cool/Off');
            section.enumSetting('runState').name('Schedule/Hold');

        });


        page.section('Hold Settings', section => {
            section.numberSetting('holdTemp').name('Hold Temp');
            section.enumSetting('holdFan').name('Hold Fan');

        });


        page.section('Monday thru Friday Schedule', section => {
            section.timeSetting('timeWakeMF').name('Wake Time of Day');
            section.numberSetting('tempSetpointWakeMF').name('Wake Temp Degrees Fahrenheit?');
            section.enumSetting('fanWakeMF').name('Wake Fan');
            section.timeSetting('timeLeaveMF').name('Leave Time of Day');
            section.numberSetting('tempSetpointLeaveMF').name('Leave Temp Degrees Fahrenheit?');
            section.enumSetting('fanLeaveMF').name('Leave Fan');
            section.timeSetting('timeReturnMF').name('Return Time of Day');
            section.numberSetting('tempSetpointReturnMF').name('Return Degrees Fahrenheit?');
            section.enumSetting('fanReturnMF').name('Return Fan');
            section.timeSetting('timeSleepMF').name('Sleep Time of Day');
            section.numberSetting('tempSetpointSleepMF').name('Sleep Degrees Fahrenheit?');
            section.enumSetting('fanSleepMF').name('Sleep Fan');

        });


        page.section('Saturday and Sunday Schedule', section => {
            section.timeSetting('timeWakeWE').name('Wake Time of Day');
            section.numberSetting('tempSetpointWakeWE').name('Wake Temp Degrees Fahrenheit?');
            section.enumSetting('fanWakeWE').name('Wake Fan');
            section.timeSetting('timeLeaveWE').name('Leave Time of Day');
            section.numberSetting('tempSetpointLeaveWE').name('Leave Temp Degrees Fahrenheit?');
            section.enumSetting('fanLeaveWE').name('Leave Fan');
            section.timeSetting('timeReturnWE').name('Return Time of Day');
            section.numberSetting('tempSetpointReturnWE').name('Return Degrees Fahrenheit?');
            section.enumSetting('fanReturnWE').name('Return Fan');
            section.timeSetting('timeSleepWE').name('Sleep Time of Day');
            section.numberSetting('tempSetpointSleepWE').name('Sleep Degrees Fahrenheit?');
            section.enumSetting('fanSleepWE').name('Sleep Fan');

        });


    })
