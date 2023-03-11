
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Change to this mode to...', section => {
            section.enumSetting('newMode').name('');

        });


        page.section('Move to this preset...', section => {
            section.enumSetting('newPreset').name('');

        });


        page.section('Change these Foscam modes...', section => {
            section.deviceSetting('foscams').capability(['imageCapture']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
