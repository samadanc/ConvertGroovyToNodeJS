
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage door', section => {
            section.deviceSetting('doorSensor').capability(['contactSensor']).name('Which sensor?');
            section.deviceSetting('doorSwitch').capability(['momentary']).name('Which switch?');
            section.numberSetting('openThreshold').name('Close when open longer than (optional)');

        });


    })

    .updated(async (context, updateData) => {

    })
