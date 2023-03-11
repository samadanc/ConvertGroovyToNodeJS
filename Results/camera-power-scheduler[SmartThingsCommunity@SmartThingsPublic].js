
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Camera power...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn the Camera On at...', section => {
            section.timeSetting('startTime').name('Start Time');

        });


        page.section('Turn the Camera Off at...', section => {
            section.timeSetting('endTime').name('End Time');

        });


    })

    .updated(async (context, updateData) => {

    })
