
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Add which new event?', section => {
            section.textSetting('event').name('Event name?');

        });


        page.section('Test which action is allowed?', section => {
            section.textSetting('action').name('Action name?');

        });


    })
