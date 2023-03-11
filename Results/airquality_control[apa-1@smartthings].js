
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Foobot', section => {
            section.deviceSetting('foobot').capability(['sensor']).name('Select a Foobot to monitor:');

        });


        page.section('Air Purifiers', section => {
            section.deviceSetting('airpurifiers').capability(['switch']).name('Select Wemo Air Purifiers');
            section.enumSetting('air_great_mode').name('Select mode for \');
            section.enumSetting('air_good_mode').name('Select mode for \');
            section.enumSetting('air_fair_mode').name('Select mode for \');
            section.enumSetting('air_poor_mode').name('Select mode for \');

        });


    })
