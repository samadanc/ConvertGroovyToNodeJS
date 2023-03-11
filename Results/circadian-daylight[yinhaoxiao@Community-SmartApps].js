
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select each bulb in only one section. Color Temperature bulbs should be most accurate at reflecting natural light.', section => {
            section.deviceSetting('ctBulbs').capability(['colorTemperature']).name('Color Temperature Bulbs');
            section.deviceSetting('cBulbs').capability(['colorControl']).name('Color Bulbs');
            section.deviceSetting('dBulbs').capability(['switchLevel']).name('Dimming Bulbs');

        });


        page.section('', section => {

        });


        page.section('Color Temperature', section => {
            section.enumSetting('sTemp').name('Campfire is easier on your eyes with a yellower hue, Moonlight is a whiter light.');

        });


        page.section('Brightness', section => {
            section.enumSetting('sBright').name('Select the desired bulb brightness during sleep modes.');

        });


        page.section('', section => {
            section.deviceSetting('dSwitches').capability(['switch']).name('Disable Circadian Daylight when these switches are on');

        });


        page.section(''Child SmartApp Name'', section => {

        });


    })
