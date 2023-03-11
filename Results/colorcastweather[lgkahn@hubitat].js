
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''First Things First'', section => {

        });


        page.section('API Key', section => {
            section.textSetting('apiKey').name('Enter your new key');
            section.enumSetting('refreshTime').name('How often to refresh?');
            section.booleanSetting('debug').name('Enable logging?');
            section.booleanSetting('descLog').name('Enable descriptionText logging');

        });


        page.section('Select Motion Detector', section => {
            section.deviceSetting('motion_detector').capability(['motionSensor']).name('Where?');

        });


        page.section('Control these bulbs...', section => {
            section.deviceSetting('hues').capability(['colorControl']).name('Which Hue Bulbs?');
            section.numberSetting('brightnessLevel').name('Brightness Level (1-100)?');
            section.booleanSetting('rememberLevel').name('Remember light settings');

        });


        page.section('Forecast Range', section => {
            section.enumSetting('forecastRange').name('Get weather for the next...');

        });


        page.section('['mobileOnly': true]', section => {

        });


        page.section('All Clear', section => {
            section.enumSetting('allClearColor').name('Color');

        });


        page.section('Low Temperature', section => {
            section.numberSetting('tempMinTrigger').name('Low Temperature - °F');
            section.enumSetting('tempMinType').name('Temperature Type');
            section.enumSetting('tempMinColor').name('Color');

        });


        page.section('High Temperature', section => {
            section.numberSetting('tempMaxTrigger').name('High Temperature - °F');
            section.enumSetting('tempMaxType').name('Temperature Type');
            section.enumSetting('tempMaxColor').name('Color');

        });


        page.section('Rain', section => {
            section.enumSetting('rainColor').name('Color');

        });


        page.section('Snow', section => {
            section.enumSetting('snowColor').name('Color');

        });


        page.section('Sleet
\n(applies to freezing rain, ice pellets, wintery mix, or hail)', section => {
            section.enumSetting('sleetColor').name('Color');

        });


        page.section('Cloudy', section => {
            section.numberSetting('cloudPercentTrigger').name('Cloud Cover %');
            section.enumSetting('cloudPercentColor').name('Color');

        });


        page.section('Dew Point
\n(Sometimes refered to as humidity)', section => {
            section.numberSetting('dewPointTrigger').name('Dew Point - °F');
            section.enumSetting('dewPointColor').name('Color');

        });


        page.section('Wind', section => {
            section.numberSetting('windTrigger').name('High Wind Speed');
            section.enumSetting('windColor').name('Color');

        });


        page.section('Weather Alerts', section => {
            section.enumSetting('alertFlash').name('Flash Lights For...');
            section.enumSetting('defaultAlertColor').name('Color');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion_detector, 'motionSensor', 'motion', 'motionHandler')

        context.api.schedules.schedule('getWeather', delay);

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (event.value == 'active') {
        if (descLog) {
        log.info('Motion detected, in ColorCastWeather!')
        }
        this.checkForWeatherOW()
        }
        

	})

    .scheduledEventHandler('getWeather', (context, event) => {
        
        let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&mode=json&units=imperial&appid=$apiKey&exclude=daily,flags,minutely"
        if (descLog) {
        log.info("Forecase URL = $forecastUrl")
        }
        if (forecastRange == 'Current conditions') {
        forecastUrl += ',hourly'
        } else {
        forecastUrl += ',currently'
        }
        if (alertFlash == null) {
        forecastUrl += ',alerts'
        }
        if (descLog) {
        log.info(forecastUrl)
        }
        this.httpGet(forecastUrl, { let response ->
        if (response.data) {
        state.weatherData = response.data
        let d = new Date()
        state.forecastTime = d.getTime()
        if (descLog) {
        log.info('Open Weather: Successfully retrieved weather.')
        }
        } else {
        this.runIn(60, getWeather)
        log.warn('Open Weather: Failed to retrieve weather.')
        }
        })
        

	})
