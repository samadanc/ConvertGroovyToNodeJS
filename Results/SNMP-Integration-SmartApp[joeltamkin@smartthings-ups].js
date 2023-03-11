
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('SNMP Devices:', section => {
            section.deviceSetting('devices').capability(['sensor']).name('Which SNMP Devices?');

        });


    })

    .updated(async (context, updateData) => {

    })
