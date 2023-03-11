
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Fronts...', section => {
            section.deviceSetting('dimmersFront').capability(['switchLevel']).name('Select');

        });


        page.section('Rears...', section => {
            section.deviceSetting('dimmersRear').capability(['switchLevel']).name('Select');

        });


    })
