
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Instructions'', section => {

        });


        page.section('Devices to link:', section => {
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Caseta Dimmers:');

        });


        page.section('', section => {

        });


    })
