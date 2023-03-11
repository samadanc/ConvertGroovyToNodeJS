
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Set this thermostat', section => {
            section.textSetting('regCd').name('Registration Code');
            section.deviceSetting('thermostat1').capability(['thermostat']).name('');

        });


        page.section('Use sensors to manage thermostat', section => {
            section.deviceSetting('motionSenors').capability(['motionSensor']).name('Motion sensor');
            section.numberSetting('falseAlarmThreshold').name('Motion sensor threshold (default 5)');
            section.deviceSetting('tempSensors').capability(['temperatureMeasurement']).name('Minimum temperature sensor');

        });


        page.section('Based on mode change', section => {
            section.timeSetting('wakeupTime').name('Wakeup from night mode?');
            section.booleanSetting('forceWakeup').name('Ingore motion during wake up?');

        });


        page.section('When heat is on', section => {
            section.numberSetting('cozyHeatPoint').name('Cozy Temperature');
            section.numberSetting('esHeatPoint').name('Energy Saving Temperature');

        });


        page.section('When A/C is on', section => {
            section.numberSetting('cozyCoolPoint').name('Cozy Temperature');
            section.numberSetting('esCoolPoint').name('Energy Saving Temperature');

        });


    })
