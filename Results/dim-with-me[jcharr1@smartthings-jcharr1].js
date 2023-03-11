
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this...', section => {
            section.deviceSetting('masters').capability(['switchLevel']).name('Master Dimmer Switch...');

        });


        page.section('Then these will follow with on/off...', section => {
            section.deviceSetting('slaves2').capability(['switch']).name('Slave On/Off Switch(es)...');

        });


        page.section('And these will follow with dimming level...', section => {
            section.deviceSetting('slaves').capability(['switchLevel']).name('Slave Dimmer Switch(es)...');

        });


    })
