
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Close this garage door', section => {
            section.deviceSetting('door').capability(['doorControl']).name('Which garage door controller?');
            section.deviceSetting('contact').capability(['contactSensor']).name('Which garage door open/close sensor?');
            section.numberSetting('openThreshold').name('Close when open longer than');

        });


    })

    .updated(async (context, updateData) => {

    })
