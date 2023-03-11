
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Stateless Virtual Switch', section => {
            section.textSetting('svsName').name('Switch Name');
            section.numberSetting('networkID').name('Network ID');

        });


    })
