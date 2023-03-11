
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At Candlelighting Change Mode To:', section => {

        });


        page.section('At Havdalah Change Mode To:', section => {

        });


        page.section('Havdalah Offset (Usually 50 or 72)', section => {
            section.numberSetting('havdalahOffset').name('Minutes After Sundown');

        });


        page.section('Your geonameid', section => {
            section.textSetting('geonameid').name('geonameid');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
        this.unschedule('endChag')
        this.unschedule('setChag')
        this.Hebcal_WebRequest()
        

	})
