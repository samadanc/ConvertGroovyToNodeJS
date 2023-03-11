
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which device(s) to Play Sound ', section => {
            section.deviceSetting('targets').capability(['musicPlayer']).name('Target dimmer switch(s)');

        });


    })
