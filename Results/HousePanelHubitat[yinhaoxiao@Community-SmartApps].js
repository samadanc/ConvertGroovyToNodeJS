
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Hubitat Configuration', section => {
            section.booleanSetting('useSmartthings').name('use ST?');
            section.booleanSetting('useHubitat').name('use Hubitat?');
            section.textSetting('localip').name('Local IP');

        });


        page.section('Lights and Switches...', section => {
            section.deviceSetting('myswitches').capability(['switch']).name('Switches');
            section.deviceSetting('mydimmers').capability(['switchLevel']).name('Dimmers');
            section.deviceSetting('mymomentaries').capability(['momentary']).name('Momentary Buttons');
            section.deviceSetting('mylights').capability(['light']).name('Lights');
            section.deviceSetting('mybulbs').capability(['colorControl']).name('Bulbs');

        });


        page.section('Motion and Presence', section => {
            section.deviceSetting('mypresences').capability(['presenceSensor']).name('Presence');
            section.deviceSetting('mysensors').capability(['motionSensor']).name('Motion');

        });


        page.section('Door and Contact Sensors', section => {
            section.deviceSetting('mycontacts').capability(['contactSensor']).name('Contact Sensors');
            section.deviceSetting('mydoors').capability(['doorControl']).name('Doors');
            section.deviceSetting('mylocks').capability(['lock']).name('Locks');

        });


        page.section('Thermostat & Environment', section => {
            section.deviceSetting('mythermostats').capability(['thermostat']).name('Thermostats');
            section.deviceSetting('mytemperatures').capability(['temperatureMeasurement']).name('Temperature Measures');
            section.deviceSetting('myilluminances').capability(['illuminanceMeasurement']).name('Illuminances');

        });


        page.section('Water', section => {
            section.deviceSetting('mywaters').capability(['waterSensor']).name('Water Sensors');
            section.deviceSetting('myvalves').capability(['valve']).name('Sprinklers');

        });


        page.section('Other Sensors (duplicates allowed)...', section => {
            section.deviceSetting('mymusics').capability(['musicPlayer']).name('Music Players');
            section.deviceSetting('mysmokes').capability(['smokeDetector']).name('Smoke Detectors');
            section.deviceSetting('myothers').capability(['sensor']).name('Other and Virtual Sensors');

        });


    })
