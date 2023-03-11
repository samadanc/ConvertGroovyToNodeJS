
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the mode changes to...', section => {

        });


        page.section('Enable these Foscam alarms...', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('');
            section.booleanSetting('notify').name('Notification?');

        });


        page.section('Only between these times...', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


    })

    .updated(async (context, updateData) => {

    })
