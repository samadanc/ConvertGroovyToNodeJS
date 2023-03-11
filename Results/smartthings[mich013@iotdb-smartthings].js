
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow IOTDB to Control & Access These Things...', section => {
            section.deviceSetting('d_switch').capability(['switch']).name('Switch');
            section.deviceSetting('d_motion').capability(['motionSensor']).name('Motion');
            section.deviceSetting('d_temperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('d_contact').capability(['contactSensor']).name('Contact');
            section.deviceSetting('d_acceleration').capability(['accelerationSensor']).name('Acceleration');
            section.deviceSetting('d_presence').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('d_battery').capability(['battery']).name('Battery');
            section.deviceSetting('d_threeAxis').capability(['threeAxis']).name('3 Axis');

        });


    })
