
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor this lock', section => {
            section.deviceSetting('lock1').capability(['lock']).name('');

        });


        page.section('Door contact sensor', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('');

        });


        page.section('And notify me if it\'s open for more than this many minutes (default 10)', section => {
            section.numberSetting('openThreshold').name('');

        });


    })

    .updated(async (context, updateData) => {

    })
