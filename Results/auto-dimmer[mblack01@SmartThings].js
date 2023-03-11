
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('luxOmatic').capability(['illuminanceMeasurement']).name('Use this lux Sensor...');
            section.numberSetting('dimDark').name('Select default dim level to use when it\');
            section.numberSetting('luxDark').name('Select maximum lux level to be considered as Dark...');
            section.numberSetting('dimDusk').name('Select default dim level to use during dusk/dawn...');
            section.numberSetting('luxDusk').name('Select maximum lux level to be considered as dusk/dawn...');
            section.numberSetting('dimDay').name('Select default dim level to use during an overcast day...');
            section.numberSetting('luxBright').name('Select maximum lux level to be considered as overcast...');
            section.numberSetting('dimBright').name('Select default dim level to use when it\');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Manage these Dimmers...');

        });


    })
