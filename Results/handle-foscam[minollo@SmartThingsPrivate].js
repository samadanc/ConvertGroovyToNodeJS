
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Away mode', section => {

        });


        page.section('Move to this preset...', section => {
            section.enumSetting('newPreset').name('');

        });


        page.section('Foscam cameas to control...', section => {
            section.deviceSetting('foscams').capability(['imageCapture']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
