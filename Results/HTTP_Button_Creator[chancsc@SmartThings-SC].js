
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Create HTTP Button', section => {
            section.textSetting('switchLabel').name('Button Label');

        });


        page.section('on this hub...', section => {

        });


    })
