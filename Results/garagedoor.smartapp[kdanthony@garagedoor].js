
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the garage door switch is turned on, open the garage door...', section => {
            section.deviceSetting('garagedoor').capability(['contactSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })
