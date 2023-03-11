
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('SMS to recieve HTTP Get command', section => {

        });


        page.section('Polling Group $n', section => {
            section.deviceSetting('group_$n').capability(['polling']).name('Select devices to be polled');

        });


    })
