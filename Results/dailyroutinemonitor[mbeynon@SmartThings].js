
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Who is being monitored?', section => {
            section.textSetting('personMonitor').name('Name?');

        });


        page.section('Who should be alerted when anomalies are detected?', section => {

        });


        page.section('Choose which sensors to monitor', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Motion sensors?');
            section.deviceSetting('contactSensors').capability(['contactSensor']).name('Open/close sensors');

        });


        page.section('Choose when to monitor sensor activity', section => {
            section.timeSetting('timeStart').name('Starting time each day?');
            section.timeSetting('timeEnd').name('Ending time each day?');
            section.numberSetting('repeatMinutes').name('Repeat check after how many minutes?');

        });


        page.section('Choose how much non-activity is required to trigger an alert', section => {
            section.numberSetting('minutesNoActivity').name('Alert after how many minutes?');

        });


        page.section('', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('firstDayHandler', delay);

    })

    .scheduledEventHandler('firstDayHandler', (context, event) => {
        
        this.scheduleRepeat()
        this.checkForActivityAndAlert()
        

	})
