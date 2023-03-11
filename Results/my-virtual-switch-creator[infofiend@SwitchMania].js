
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Create a Virtual Switch (Be sure to install all of the device types).', section => {
            section.textSetting('switchLabel').name('Switch Label');
            section.enumSetting('switchType').name('What kind of Virtual Switch do you want?');

        });


    })
