
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Gidjit to have access, thereby allowing you to quickly control and monitor your following devices. Privacy Policy can be found at http://priv.gidjit.com/privacy.html', section => {
            section.deviceSetting('switches').capability(['switch']).name('Control/Monitor your switches');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Control/Monitor your thermostats');
            section.deviceSetting('windowShades').capability(['windowShade']).name('Control/Monitor your window shades');

        });


        page.section('', section => {

        });


    })
