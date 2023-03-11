
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Zip code (for sunrise/sunset)', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('checkSun', delay);

    })

    .scheduledEventHandler('checkSun', (context, event) => {
        
        let zip = (settings.zip as String)
        let sunInfo = this.getSunriseAndSunset(['zipCode': zip ])
        let current = this.now()
        if (sunInfo.sunrise.time > current || sunInfo.sunset.time < current ) {
        state.sunMode = 'sunset'
        } else {
        state.sunMode = 'sunrise'
        }
        log.info("Sunset: ${sunInfo.sunset.time}")
        log.info("Sunrise: ${sunInfo.sunrise.time}")
        log.info("Current: $current")
        log.info("sunMode: ${state.sunMode}")
        if (current < sunInfo.sunrise.time) {
        this.runIn(sunInfo.sunrise.time - current / 1000.toInteger(), setSunrise)
        }
        if (current < sunInfo.sunset.time) {
        this.runIn(sunInfo.sunset.time - current / 1000.toInteger(), setSunset)
        }
        

	})
