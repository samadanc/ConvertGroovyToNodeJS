
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose the time you\'d like the weather report to be sent to devices.', section => {
            section.timeSetting('weather_check_time').name('Choose a time to check the weather each day');

        });


        page.section('Choose the zip code you\'d like the weather report for.', section => {
            section.numberSetting('weather_zip_code').name('Enter the zip code you\');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('weatherCheckHandler', delay);

    })

    .scheduledEventHandler('weatherCheckHandler', (context, event) => {
        
        let params = ['uri': 'https://api.openweathermap.org/data/2.5/', 'path': 'forecast', 'contentType': 'application/json', 'query': ['zip': weather_zip_code , 'appid': appSettings.openweather_api_key, 'units': 'imperial']]
        try {
        this.httpGet(params, { let resp ->
        let temperature_avg = resp.data.list[0].main.temp + resp.data.list[1].main.temp + resp.data.list[2].main.temp / 3
        let morning_string = ''
        if (temperature_avg >= 80) {
        morning_string = 'Morning: Hot! '
        } else {
        if (temperature_avg <= 20) {
        morning_string = 'Morning: Cold! '
        } else {
        morning_string = 'Morning: '
        }
        }
        morning_string = morning_string + "${resp.data.list[0].weather[0].description.capitalize()}, ${Math.round(resp.data.list[0].main.temp)}°"
        let temperature_diff = resp.data.list[0].main.temp - resp.data.list[2].main.temp
        if (temperature_diff > 15) {
        morning_string = morning_string + ', falling quickly.'
        } else {
        if (temperature_diff < -15) {
        morning_string = morning_string + ', rising quickly.'
        } else {
        morning_string = morning_string + '.'
        }
        }
        let wind_speed = resp.data.list[0].wind.speed + resp.data.list[1].wind.speed + resp.data.list[2].wind.speed / 3
        if (wind_speed > 10) {
        morning_string = morning_string + ' Breezy.'
        } else {
        if (wind_speed > 15) {
        morning_string = morning_string + ' Windy!'
        }
        }
        temperature_avg = resp.data.list[2].main.temp + resp.data.list[3].main.temp + resp.data.list[4].main.temp / 3
        let afternoon_string = ''
        if (temperature_avg >= 80) {
        afternoon_string = 'Afternoon: Hot! '
        } else {
        if (temperature_avg <= 20) {
        afternoon_string = 'Afternoon: Cold! '
        } else {
        afternoon_string = 'Afternoon: '
        }
        }
        afternoon_string = afternoon_string + "${resp.data.list[2].weather[0].description.capitalize()}"
        let afternoon_temp = Math.round(resp.data.list[2].main.temp)
        for (let i = 5; i >= 3; i--) {
        if (resp.data.list[ i ].weather[0].description != resp.data.list[2].weather[0].description) {
        afternoon_string = afternoon_string + ", then ${resp.data.list[i].weather[0].description}"
        break
        }
        }
        for (let i = 5; i >= 3; i--) {
        if (resp.data.list[ i ].main.temp > afternoon_temp ) {
        afternoon_temp = Math.round(resp.data.list[ i ].main.temp)
        }
        }
        afternoon_string = afternoon_string + ". $afternoon_temp°"
        temperature_diff = resp.data.list[2].main.temp - resp.data.list[4].main.temp
        if (temperature_diff > 15) {
        afternoon_string = afternoon_string + ', falling quickly.'
        } else {
        if (temperature_diff < -15) {
        afternoon_string = afternoon_string + ', rising quickly.'
        } else {
        afternoon_string = afternoon_string + '.'
        }
        }
        wind_speed = resp.data.list[2].wind.speed + resp.data.list[3].wind.speed + resp.data.list[4].wind.speed / 3
        if (wind_speed > 10) {
        afternoon_string = afternoon_string + ' Breezy.'
        } else {
        if (wind_speed > 15) {
        afternoon_string = afternoon_string + ' Windy!'
        }
        }
        temperature_avg = resp.data.list[4].main.temp + resp.data.list[5].main.temp + resp.data.list[6].main.temp / 3
        let evening_string = ''
        if (temperature_avg >= 80) {
        evening_string = 'Evening: Hot! '
        } else {
        if (temperature_avg <= 20) {
        evening_string = 'Evening: Cold! '
        } else {
        evening_string = 'Evening: '
        }
        }
        evening_string = evening_string + "${resp.data.list[4].weather[0].description.capitalize()}, ${Math.round(resp.data.list[4].main.temp)}°"
        temperature_diff = resp.data.list[4].main.temp - resp.data.list[6].main.temp
        if (temperature_diff > 15) {
        evening_string = evening_string + ', falling quickly.'
        } else {
        if (temperature_diff < -15) {
        evening_string = evening_string + ', rising quickly.'
        } else {
        evening_string = evening_string + '.'
        }
        }
        wind_speed = resp.data.list[4].wind.speed + resp.data.list[5].wind.speed + resp.data.list[6].wind.speed / 3
        if (wind_speed > 10) {
        evening_string = evening_string + ' Breezy.'
        } else {
        if (wind_speed > 15) {
        evening_string = evening_string + ' Windy!'
        }
        }
        let weather_string = morning_string + '\n' + afternoon_string + '\n' + evening_string
        this.sendPush(weather_string)
        })
        }
        catch (let e) {
        log.error("Something went wrong: $e")
        }
        

	})
