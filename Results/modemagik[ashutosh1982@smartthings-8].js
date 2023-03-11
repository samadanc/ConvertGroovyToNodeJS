
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('doUpdate', delay);

    })

    .scheduledEventHandler('doUpdate', (context, event) => {
        
        if (state.sunMode == null) {
        this.initialSunPosition()
        }
        if (this.anyoneIsHome()) {
        if (state.sunMode == 'sunset' && location.mode != 'HomeNight') {
        let message = "Performing "$homeNight" for you as requested."
        log.info(message)
        this.send(message)
        location.helloHome.execute(settings.homeNight)
        } else {
        if (state.sunMode == 'sunrise' && location.mode != 'HomeDay') {
        let message = "Performing "$homeDay" for you as requested."
        log.info(message)
        this.send(message)
        location.helloHome.execute(settings.homeDay)
        } else {
        console.log('home already?')
        }
        }
        } else {
        if (state.sunMode == 'sunset' && location.mode != 'AwayNight') {
        let message = "Performing "$awayNight" for you as requested."
        log.info(message)
        this.send(message)
        location.helloHome.execute(settings.awayNight)
        } else {
        if (state.sunMode == 'sunrise' && location.mode != 'AwayDay') {
        let message = "Performing "$awayDay" for you as requested."
        log.info(message)
        this.send(message)
        location.helloHome.execute(settings.awayDay)
        } else {
        console.log('away already?')
        }
        }
        }
        

	})
