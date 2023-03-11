
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a weather sensor... ', section => {
            section.deviceSetting('sensor').capability(['waterSensor']).name('Sensor?');

        });


        page.section('When it rains change mode to...', section => {

        });


        page.section('When it\'s all clear change mode to...', section => {

        });


        page.section('and (optionally) turn off these lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkWeather', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'waterSensor', 'water', 'waterHandler')

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
        console.log('Water Sensor triggered!')
        this.weatherModeChange(evt)
        

	})

    .scheduledEventHandler('checkWeather', (context, event) => {
        
        let weather = this.getWeatherFeature('conditions')
        let currentConditions = weather.current_observation.icon
        let wet = 'wet'
        let dry = 'dry'
        let rain = 'rain'
        let snow = 'snow'
        let clear = 'clear'
        console.log("It's currently $currentConditions")
        if (currentConditions == 'rain' || currentConditions == 'tstorms' || currentConditions == 'snow' || currentConditions == 'sleet') {
        if (location.mode != rainMode ) {
        console.log('conditions require light')
        if (currentConditions == 'snow' || currentConditions == 'sleet') {
        this.weatherModeChange(wet, snow)
        } else {
        this.weatherModeChange(wet, rain)
        }
        }
        } else {
        if (location.mode == rainMode ) {
        console.log('conditions do not need light')
        this.weatherModeChange(dry, clear)
        }
        }
        

	})
