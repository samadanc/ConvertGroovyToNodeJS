
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('AccuWeather', section => {
            section.textSetting('accuWeatherApiKey').name('AccuWeather API Key');

        });


        page.section('Settings', section => {
            section.textSetting('zipCode').name('Zip code');
            section.deviceSetting('sensors').capability(['contactSensor']).name('Windows to monitor');

        });


        page.section('Device Options', section => {

        });


        page.section('Audio Notifications', section => {
            section.deviceSetting('audioSpeakers').capability(['audioNotification']).name('Audio Devices');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('refreshData', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'contactSensor', 'contact.open', 'eventHandler')

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
        console.log(APP_NAME + ": Sensor opened: $evt")
        this.refreshData(false)
        

	})

    .scheduledEventHandler('refreshData', (context, event) => {
        
        this.refreshData(false)
        

	})
