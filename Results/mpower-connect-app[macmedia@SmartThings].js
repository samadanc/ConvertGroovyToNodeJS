
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Add a mPower Device', section => {
            section.textSetting('IP').name('mPower Device IP Address');
            section.textSetting('port').name('mPower Device Port');
            section.textSetting('username').name('Username');

        });


    })
