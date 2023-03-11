
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of the following devices trigger...', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch?');

        });


        page.section('Then trigger...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Alarms');

        });


        page.section('Time delay in seconds...', section => {
            section.numberSetting('alarmdelay').name('Seconds to delay alarm');

        });


    })

    .updated(async (context, updateData) => {

    })
