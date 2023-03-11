
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow API access to manage these devices:', section => {
            section.deviceSetting('devicesSwitch').capability(['switch']).name('Switches');
            section.deviceSetting('devicesMotion').capability(['motionSensor']).name('Motion Sensors');
            section.deviceSetting('devicesTemperature').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('devicesContact').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('devicesPresence').capability(['presenceSensor']).name('Presence Sensors');
            section.deviceSetting('devicesLock').capability(['lock']).name('Locks');

        });


        page.section('StackStorm Server Configuration', section => {
            section.textSetting('st2Server').name('FQDN to StackStorm Server');
            section.textSetting('st2ApiKey').name('StackStorm / SmartThings API Key');

        });


    })
