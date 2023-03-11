
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Step 1', section => {
            section.textSetting('code').name('Code');
            section.textSetting('token1').name('First Access Token');
            section.textSetting('phoneNum').name('Your phone number');

        });


        page.section('Step 2', section => {
            section.textSetting('token2').name('Second Access Token');
            section.textSetting('otp').name('The OTP code your received on SMS');

        });


    })
