
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select the button/remote...', section => {
            section.deviceSetting('button1').capability(['button']).name('Button Press');

        });


        page.section('Choose button and press type...', section => {
            section.enumSetting('buttonNumber').name('Button Number (defaults to 1)');
            section.enumSetting('buttonAction').name('Button Action (defaults to \');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Color Bulbs?');

        });


        page.section('Choose light effects...', section => {
            section.enumSetting('color').name('Hue Color?');
            section.enumSetting('lightLevel').name('Light Level?');

        });


        page.section('['hideable': true, 'hidden': false], 'More options', section => {

        });


    })
