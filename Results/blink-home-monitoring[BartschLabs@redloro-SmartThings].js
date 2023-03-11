
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SmartThings Hub', section => {

        });


        page.section('Blink Credentials', section => {
            section.textSetting('blinkUser').name('Email');

        });


        page.section('Smart Home Monitor', section => {
            section.booleanSetting('enableSHM').name('Integrate with Smart Home Monitor');

        });


    })
