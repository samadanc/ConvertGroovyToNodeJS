
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What Garage Door?', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Open/Closed Sensor');
            section.deviceSetting('opener1').capability(['momentary']).name('Garage Door Button');

        });


        page.section('Actions', section => {
            section.timeSetting('alertTime').name('Alert Me At This Time');

        });


    })

    .updated(async (context, updateData) => {

    })
