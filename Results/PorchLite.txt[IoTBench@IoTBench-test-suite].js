
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At sunrise...', section => {
            section.deviceSetting('sunriseOn').capability(['switch']).name('Turn on?');
            section.numberSetting('sunriseOnLevel').name('On Level?');
            section.deviceSetting('sunriseOff').capability(['switch']).name('Turn off?');

        });


        page.section('At sunset...', section => {
            section.deviceSetting('sunsetOn').capability(['switch']).name('Turn on?');
            section.numberSetting('sunsetOnLevel').name('On Level?');
            section.deviceSetting('sunsetOff').capability(['switch']).name('Turn off?');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('astroCheck', delay);

    })

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let riseTime = s.sunrise
        let setTime = s.sunset
        console.log("riseTime: $riseTime")
        console.log("setTime: $setTime")
        state.riseTime = riseTime.time
        state.setTime = setTime.time
        this.unschedule('sunriseHandler')
        this.unschedule('sunsetHandler')
        if (riseTime.after(now)) {
        log.info("scheduling sunrise handler for $riseTime")
        this.runOnce(riseTime, sunriseHandler)
        }
        if (setTime.after(now)) {
        log.info("scheduling sunset handler for $setTime")
        this.runOnce(setTime, sunsetHandler)
        }
        

	})
