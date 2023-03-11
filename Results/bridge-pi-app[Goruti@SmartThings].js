
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Connect to ...', section => {
            section.deviceSetting('theRPi').capability(['bridge']).name('Which?');

        });


        page.section('['hideable': true, 'hidden': true], 'Presence Setup', section => {
            section.textSetting('presenceName1').name('Presence 1 Name');
            section.textSetting('presenceName2').name('Presence 2 Name');
            section.textSetting('presenceName3').name('Presence 3 Name');
            section.textSetting('presenceName4').name('Presence 4 Name');
            section.textSetting('presenceName5').name('Presence 4 Name');

        });


        page.section('['hideable': true, 'hidden': true], 'TV & Blu-ray Setup', section => {

        });


        page.section('['hideable': true, 'hidden': true], 'Flask Server Setup', section => {

        });


        page.section('['hideable': true, 'hidden': true], 'Alarm Setup', section => {
            section.textSetting('zoneName1').name('Zone 1 Name');
            section.enumSetting('zoneType1').name('Zone 1 Kind');
            section.textSetting('zoneName2').name('Zone 2 Name');
            section.enumSetting('zoneType2').name('Zone 2 Kind');
            section.textSetting('zoneName3').name('Zone 3 Name');
            section.enumSetting('zoneType3').name('Zone 3 Kind');
            section.textSetting('zoneName4').name('Zone 4 Name');
            section.enumSetting('zoneType4').name('Zone 4 Kind');

        });


    })
