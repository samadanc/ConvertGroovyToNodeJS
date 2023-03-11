
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
            section.enumSetting('setColProg1').name('Colour or Program?');

        });


        page.section('', section => {
            section.numberSetting('dimLevel1').name('Dim Level (0-100)');

        });


        page.section('', section => {
            section.numberSetting('whiteLevel1').name('Add some white? (0-100)');

        });


        page.section('If Using a Custom colour', section => {
            section.numberSetting('redDim1').name('How much RED? (0-100)');
            section.numberSetting('greenDim1').name('How much GREEN? (0-100)');
            section.numberSetting('blueDim1').name('How much BLUE? (0-100)');
            section.numberSetting('whiteDim1').name('How much White? (0-100)');

        });


        page.section('Logging', section => {
            section.booleanSetting('debugmode').name('Enable logging');

        });


    })
