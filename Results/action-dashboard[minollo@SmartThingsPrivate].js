
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''About'', section => {

        });


        page.section('Allow control of these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('dimmers').capability(['switchLevel']).name('Which Dimmers?');
            section.deviceSetting('momentaries').capability(['momentary']).name('Which Momentary Switches?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


        page.section('View state of these things...', section => {
            section.deviceSetting('alarms').capability(['alarm']).name('Which Alarms?');
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which Contact?');
            section.deviceSetting('presence').capability(['presenceSensor']).name('Which Presence?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('temperature').capability(['temperatureMeasurement']).name('Which Temperature?');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Which Hygrometer?');
            section.deviceSetting('motion').capability(['motionSensor']).name('Which Motion?');

        });


        page.section('Dashboard Preferences...', section => {
            section.enumSetting('theme').name('Theme');
            section.booleanSetting('viewOnly').name('View Only');

        });


        page.section('Automatically refresh dashboard...', section => {

        });


        page.section('Reset AOuth Access Token...', section => {
            section.booleanSetting('resetOauth').name('Reset AOuth Access Token?');

        });


        page.section('Send text message to...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('scheduledWeatherRefresh', delay);

    })

    .scheduledEventHandler('scheduledWeatherRefresh', (context, event) => {
        
        weather?.refresh()
        state.lastWeatherRefresh = this.getTS()
        

	})
