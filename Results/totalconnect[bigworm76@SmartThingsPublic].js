
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Give your Total Connect credentials. Recommended to make another user for SmartThings', section => {
            section.textSetting('userName').name('Username');
            section.textSetting('applicationId').name('Application ID - It is \');
            section.textSetting('applicationVersion').name('Application Version');

        });


    })

    .updated(async (context, updateData) => {

    })
