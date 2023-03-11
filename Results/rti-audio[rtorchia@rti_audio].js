
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('RTI Audio Device Setup', section => {
            section.textSetting('deviceIP').name('IP Address');
            section.numberSetting('maxZones').name('Max Zones');

        });


        page.section('RTI Audio Source Names', section => {
            section.textSetting('s1Name').name('Source 1');
            section.textSetting('s2Name').name('Source 2');
            section.textSetting('s3Name').name('Source 3');
            section.textSetting('s4Name').name('Source 4');

        });


    })
