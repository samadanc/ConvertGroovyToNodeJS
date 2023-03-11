
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.booleanSetting('chatsEnabled').name('Enable This Notification?');

        });


        page.section('Other Options', section => {

        });


    })

    .updated(async (context, updateData) => {

    })
