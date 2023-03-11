
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Allow Logitech Harmony to control these things...', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which Switches?');
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Which Motion Sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Which Contact Sensors?');
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

        context.api.schedules.runEvery5Minutes('discovery', delay);

    })

    .scheduledEventHandler('discovery', (context, event) => {
        
        let Params = ['auth': state.HarmonyAccessToken]
        let url = "https://home.myharmony.com/cloudapi/activity/all?${this.toQueryString(Params)}"
        try {
        this.httpGet(['uri': url , 'headers': ['Accept': 'application/json']], { let response ->
        if (response.status == 200) {
        console.log('valid Token')
        state.Harmonydevices = response.data
        state.resethub = false
        this.getActivityList()
        this.poll()
        } else {
        console.log("Error: ${response.status}")
        }
        })
        }
        catch (groovyx.net.http.HttpResponseException e) {
        if (e.statusCode == 401) {
        state.remove('HarmonyAccessToken')
        log.warn('Harmony Access token has expired')
        }
        }
        catch (java.net.SocketTimeoutException e) {
        log.warn('Connection to the hub timed out. Please restart the hub and try again.')
        state.resethub = true
        }
        return null
        

	})
