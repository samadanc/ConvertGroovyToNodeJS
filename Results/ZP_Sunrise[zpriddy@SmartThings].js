
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At this time every day', section => {
            section.timeSetting('timeOfDay').name('Time of Day');
            section.enumSetting('days').name('Only on certain days of the week');
            section.numberSetting('sunriseTime').name('How many minutes do you want the sunrise to last?');

        });


        page.section('On mode changes', section => {

        });


        page.section('Change These Lights', section => {
            section.deviceSetting('sunLights').capability(['colorControl']).name('What lights do you want to be the Sun? (Whites)');
            section.deviceSetting('sunriseLights').capability(['colorControl']).name('What lights do you want to be the sunrise lights? (Yellows)');
            section.deviceSetting('skyLights').capability(['colorControl']).name('What lights do you want to be the sky lights? (Blues)');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sunriseHandler', delay);

    })

    .scheduledEventHandler('sunriseHandler', (context, event) => {
        
        if (daysOk) {
        log.trace('Days Okay')
        this.sunrise()
        }
        

	})
