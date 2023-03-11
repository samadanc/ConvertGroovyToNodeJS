
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Weather threshholds to alert at...', section => {
            section.numberSetting('highwindspeed').name('Avg Wind Speed (MPH)');
            section.numberSetting('hightempf').name('High Temperature (Deg F)');
            section.numberSetting('lowtempf').name('Low Temperature (Deg F)');
            section.numberSetting('highrainfall').name('Rainfall Threshhold (Inches)');

        });


        page.section('In addition to push notifications, send text alerts to...', section => {

        });


        page.section('Weather Underground Weather Station ID', section => {
            section.textSetting('stationid').name('Station ID');

        });


        page.section('Custom Alert Messages', section => {
            section.textSetting('warmmsg').name('Too Hot Message');
            section.textSetting('coldmsg').name('Too Cold Message');
            section.textSetting('windymsg').name('Windy Message');
            section.textSetting('wetmsg').name('Wet Message');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setDefaultWeather', delay);

        context.api.schedules.runEvery5Minutes('checkWeather', delay);

    })

    .scheduledEventHandler('checkWeather', (context, event) => {
        
        let weather
        console.log("WeatherStation: pws:{$stationid}")
        weather = this.getWeatherFeature('conditions', "pws:$stationid")
        if (!weather) {
        console.log('Something went wrong, no data found.')
        return false
        }
        let windspeed = weather.current_observation.wind_mph
        let tempf = weather.current_observation.temp_f
        let hourlyprecip = Float.parseFloat(weather.current_observation.precip_1hr_in)
        console.log("Actual: $windspeed, $tempf, $hourlyprecip")
        console.log("Threshholds: $highwindspeed, $hightempf, $lowtempf, $hourlyprecip")
        console.log("State: ${state.lastHighWindSpeed}, ${state.lasthightempf}, ${state.lastlowtempf}, ${state.lasthourlyprecip}")
        console.log("${settings.windymsg} ${settings.warmmsg} ${settings.coldmsg} ${settings.wetmsg}")
        if (windspeed > highwindspeed ) {
        if (windspeed >= state.lastHighWindSpeed + 3.0) {
        state.lastHighWindSpeed = windspeed
        this.notifyPeople("${settings.windymsg} $windspeed")
        } else {
        console.log('not enough wind speed change')
        }
        } else {
        state.lastHighWindSpeed = windspeed
        }
        if (tempf > hightempf ) {
        if (tempf >= state.lasthightempf + 3.0) {
        state.lasthightempf = tempf
        this.notifyPeople("${settings.warmmsg} $tempfF")
        } else {
        console.log('not enough high temp change')
        }
        } else {
        state.lasthightempf = tempf
        }
        if (tempf < lowtempf ) {
        if (tempf <= state.lastlowtempf - 3.0) {
        state.lastlowtempf = tempf
        this.notifyPeople("${settings.coldmsg} $tempfF")
        } else {
        console.log('not enough low temp change')
        }
        } else {
        state.lastlowtempf = tempf
        }
        if (hourlyprecip > highrainfall ) {
        if (hourlyprecip >= state.lasthourlyprecip + 1.0) {
        state.lasthourlyprecip = hourlyprecip
        this.notifyPeople("${settings.wetmsg} $hourlyprecipin.")
        } else {
        console.log('not enough precip change')
        }
        } else {
        state.lasthourlyprecip = hourlyprecip
        }
        

	})

    .scheduledEventHandler('setDefaultWeather', (context, event) => {
        
        state.lastHighWindSpeed = 0.0
        state.lasthightempf = 65.0
        state.lastlowtempf = 40.0
        state.lasthourlyprecip = 0.0
        console.log("state: ${state.lastHighWindSpeed}, ${state.lasthightempf}, ${state.lastlowtempf}, ${state.lasthourlyprecip}")
        

	})
