
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Devices', section => {
            section.deviceSetting('camera').capability(['imageCapture']).name('');

        });


        page.section('Preferences', section => {
            section.enumSetting('detection').name('Motion or PIR');

        });


    })

    .updated(async (context, updateData) => {

    })
