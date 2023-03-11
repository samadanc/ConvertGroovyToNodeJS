
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('''', section => {

        });


        page.section('', section => {
            section.deviceSetting('switch1').capability(['switch']).name('On/Off switch');

        });


        page.section('', section => {
            section.deviceSetting('fibaro1').capability(['switch']).name('Fibaro Controller');

        });


        page.section('', section => {
            section.enumSetting('setColProg1').name('1st Colour or Program');
            section.enumSetting('setColProg2').name('2nd Colour or Program');
            section.enumSetting('setColProg3').name('3rd Colour or Program');
            section.enumSetting('setColProg4').name('4th Colour or Program');

        });


        page.section('', section => {
            section.numberSetting('delay1').name('How long to keep 1st Colour or Program on? (seconds)');
            section.numberSetting('delay2').name('How long to keep 2nd Colour or Program on? (seconds)');
            section.numberSetting('delay3').name('How long to keep 3rd Colour or Program on? (seconds)');
            section.numberSetting('delay4').name('How long to keep 4th Colour or Program on? (seconds)');

        });


        page.section('', section => {
            section.numberSetting('dimLevel1').name('Dim Level (0-100)');

        });


        page.section('', section => {
            section.numberSetting('whiteLevel1').name('Add some white to the colours? (0-100)');

        });


    })
