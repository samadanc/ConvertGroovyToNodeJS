
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
            section.deviceSetting('switch2').capability(['switch']).name('Dim/Bright switch');

        });


        page.section('', section => {
            section.deviceSetting('fibaro1').capability(['switch']).name('Fibaro Controller');

        });


        page.section('Custom colour 1', section => {
            section.numberSetting('redDim1').name('How much RED? (0-100)');
            section.numberSetting('greenDim1').name('How much GREEN? (0-100)');
            section.numberSetting('blueDim1').name('How much BLUE? (0-100)');
            section.numberSetting('whiteDim1').name('How much White? (0-100)');

        });


        page.section('Custom colour 2', section => {
            section.numberSetting('redDim2').name('How much RED? (0-100)');
            section.numberSetting('greenDim2').name('How much GREEN? (0-100)');
            section.numberSetting('blueDim2').name('How much BLUE? (0-100)');
            section.numberSetting('whiteDim2').name('How much White? (0-100)');

        });


    })
