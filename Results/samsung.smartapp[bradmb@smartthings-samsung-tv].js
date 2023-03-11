
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Samsung TV Settings', section => {
            section.textSetting('settingIpAddress').name('IP Address');
            section.textSetting('settingMacAddress').name('MAC Address');
            section.enumSetting('tvCommand').name('Perform This Command');

        });


    })

    .updated(async (context, updateData) => {

    })
