
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use the values printed on the bottom of your Eagle', section => {
            section.textSetting('macId').name('MAC Address');
            section.textSetting('cloudId').name('Cloud ID');

        });


        page.section('Eagle must have a static IP, default port is 80', section => {

        });


        page.section('', section => {

        });


    })
