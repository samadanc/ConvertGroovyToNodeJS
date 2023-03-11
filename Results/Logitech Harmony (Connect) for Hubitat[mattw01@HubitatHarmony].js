
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Logitech Harmony to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
            section.deviceSetting('thermostats').capability(['thermostat']).name('Which Thermostats?');
            section.deviceSetting('presenceSensors').capability(['presenceSensor']).name('Which Presence Sensors?');
            section.deviceSetting('temperatureSensors').capability(['temperatureMeasurement']).name('Which Temperature Sensors?');
            section.deviceSetting('accelerationSensors').capability(['accelerationSensor']).name('Which Vibration Sensors?');
            section.deviceSetting('waterSensors').capability(['waterSensor']).name('Which Water Sensors?');
            section.deviceSetting('lightSensors').capability(['illuminanceMeasurement']).name('Which Light Sensors?');
            section.deviceSetting('humiditySensors').capability(['relativeHumidityMeasurement']).name('Which Relative Humidity Sensors?');
            section.deviceSetting('alarms').capability(['alarm']).name('Which Sirens?');
            section.deviceSetting('locks').capability(['lock']).name('Which Locks?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
        if (state.HarmonyAccessToken) {
        let tokenParam = ['auth': state.HarmonyAccessToken]
        let params = ['uri': "https://home.myharmony.com/cloudapi/state?${this.toQueryString(tokenParam)}", 'headers': ['Accept': 'application/json'], 'contentType': 'application/json']
        this.httpGet(params, { let response ->
        this.pollResponse(response)
        })
        } else {
        log.warn('Harmony - Access token has expired')
        }
        

	})
