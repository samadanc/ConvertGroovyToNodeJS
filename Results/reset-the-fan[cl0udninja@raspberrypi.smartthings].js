
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When any of the following devices trigger...', section => {
            section.deviceSetting('mySwitch').capability(['switch']).name('Switch?');

        });


        page.section('Then flash...', section => {
            section.deviceSetting('switches').capability(['switch']).name('These lights');
            section.numberSetting('numFlashes').name('This number of times (default 5)');

        });


        page.section('Time settings in milliseconds (optional)...', section => {
            section.numberSetting('onFor').name('On for (default 3000)');
            section.numberSetting('offFor').name('Off for (default 3000)');

        });


    })

    .updated(async (context, updateData) => {

    })
