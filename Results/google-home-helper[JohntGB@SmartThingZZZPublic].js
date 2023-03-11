
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.timeSetting('timeStart').name('Starting');
            section.timeSetting('timeEnd').name('Ending');

        });


        page.section('', section => {

        });


        page.section('Switch/Baseboard Selection', section => {
            section.deviceSetting('vDimmerBB').capability(['switchLevel']).name('Control Switch (Dimmer)');
            section.deviceSetting('tstatBB').capability(['thermostat']).name('Thermostat To Control');

        });


        page.section('['hideable': true, 'hidden': !(upLimitTstatBB || lowLimitTstatBB )], 'Baseboard Temperature Limits', section => {
            section.numberSetting('upLimitTstatBB').name('Thermostat Upper Limit');
            section.numberSetting('lowLimitTstatBB').name('Thermostat Lower Limit');

        });


        page.section('['hideable': true, 'hidden': !(setpointBBon || setpointBBoff )], 'Baseboard On/Off Setpoints', section => {
            section.numberSetting('setpointBBon').name('Setpoint When Control Switch Turned On');
            section.numberSetting('setpointBBoff').name('Setpoint When Control Switch Turned Off');

        });


        page.section('', section => {
            section.deviceSetting('voicePresence').capability(['presenceSensor']).name('Presence Sensors To Report Their Status...');
            section.booleanSetting('voicePresentOnly').name('Report Only Sensors That Are \');

        });


        page.section('', section => {
            section.deviceSetting('voiceSwitch').capability(['switch']).name('Switches To Report Their Status...');
            section.booleanSetting('voiceOnSwitchOnly').name('Report Only Switches That Are On');
            section.deviceSetting('voiceDimmer').capability(['switchLevel']).name('Dimmers To Report Their Status...');
            section.booleanSetting('voiceOnDimmerOnly').name('Report Only Dimmers That Are On');

        });


        page.section('', section => {
            section.deviceSetting('voiceDoorSensors').capability(['contactSensor']).name('Doors/Windows Sensors To Report Their Status...');
            section.deviceSetting('voiceDoorControls').capability(['doorControl']).name('Door Controls To Report Their Status...');
            section.deviceSetting('voiceDoorLocks').capability(['lock']).name('Locks To Report Their Status...');
            section.booleanSetting('voiceDoorAll').name('Report Door/Window Summary Even When All Are Closed And Locked');

        });


    })
