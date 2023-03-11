
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices To Poll', section => {
            section.deviceSetting('pollingDevices').capability(['polling']).name('Pollable Devices');

        });


        page.section('Polling Interval (defaults to 15 min)', section => {

        });


    })
