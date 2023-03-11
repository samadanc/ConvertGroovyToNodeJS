
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select a sensor', section => {
            section.deviceSetting('temp').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Humidity');

        });


        page.section('Configure your Weather Underground credentials', section => {
            section.textSetting('weatherID').name('Weather Station ID');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery10Minutes('updateCurrentWeather', delay);

    })

    .scheduledEventHandler('updateCurrentWeather', (context, event) => {
        
        let params = ['uri': 'http://weatherstation.wunderground.com', 'path': '/weatherstation/updateweatherstation.php', 'query': ['ID': weatherID , 'PASSWORD': password , 'dateutc': 'now', 'tempf': temp.currentTemperature, 'humidity': humidity.currentHumidity, 'action': 'updateraw']]
        if (temp.currentTemperature) {
        try {
        this.httpGet(params, { let resp ->
        console.log("response data: ${resp.data}")
        })
        }
        catch (let e) {
        log.error("something went wrong: $e")
        }
        }
        

	})
