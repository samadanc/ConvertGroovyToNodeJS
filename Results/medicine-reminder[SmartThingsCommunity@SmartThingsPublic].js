
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose your medicine cabinet...', section => {
            section.deviceSetting('cabinet1').capability(['contactSensor']).name('Where?');

        });


        page.section('Take my medicine at...', section => {
            section.timeSetting('time1').name('Time 1');
            section.timeSetting('time2').name('Time 2');
            section.timeSetting('time3').name('Time 3');
            section.timeSetting('time4').name('Time 4');

        });


        page.section('I forget send me a notification and/or text message...', section => {
            section.enumSetting('sendPush').name('Push Notification');

        });


        page.section('Time window (optional, defaults to plus or minus 15 minutes', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck2', delay);

        context.api.schedules.schedule('scheduleCheck0', delay);

        context.api.schedules.schedule('scheduleCheck3', delay);

        context.api.schedules.schedule('scheduleCheck1', delay);

    })

    .scheduledEventHandler('scheduleCheck2', (context, event) => {
        
        this.scheduleCheck()
        

	})

    .scheduledEventHandler('scheduleCheck1', (context, event) => {
        
        this.scheduleCheck()
        

	})

    .scheduledEventHandler('scheduleCheck3', (context, event) => {
        
        this.scheduleCheck()
        

	})

    .scheduledEventHandler('scheduleCheck0', (context, event) => {
        
        this.scheduleCheck()
        

	})
