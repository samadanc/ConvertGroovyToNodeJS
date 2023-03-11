
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use the orientation of this cube', section => {
            section.deviceSetting('cube').capability(['threeAxis']).name('SmartSense Multi sensor');

        });


        page.section('To control these lights', section => {
            section.deviceSetting('lights').capability(['switch']).name('Lights, switches & dimmers');

        });


        page.section(' ', section => {

        });


    })
