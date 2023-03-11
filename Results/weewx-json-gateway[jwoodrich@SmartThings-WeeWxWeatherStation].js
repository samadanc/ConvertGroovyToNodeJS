
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Access', section => {
            section.numberSetting('weewxPort').name('Port');

        });


        page.section('Timing', section => {
            section.numberSetting('pollfreq').name('Frequency (mins)');

        });


        page.section('Developer', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('pollWeather', delay);

    })

    .scheduledEventHandler('pollWeather', (context, event) => {
        
        if (weewxLAN) {
        this.pollWeatherFromLAN()
        } else {
        this.pollWeatherFromInternet()
        }
        

	})
