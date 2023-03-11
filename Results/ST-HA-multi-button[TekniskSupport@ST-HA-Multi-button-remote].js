
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Track these Buttons:', section => {
            section.deviceSetting('buttons').capability(['button']).name('');

        });


        page.section('Track these Actuators:', section => {
            section.deviceSetting('actuators').capability(['actuator']).name('');

        });


        page.section('hass Server', section => {
            section.textSetting('hass_host').name('Home assistant Hostname/IP');
            section.numberSetting('hass_port').name('Home assistant Port');
            section.textSetting('hass_token').name('Home assistant long lived token');

        });


    })
