
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Arm/Disarm these cameras', section => {
            section.deviceSetting('cameras').capability(['imageCapture']).name('');

        });


        page.section('When people arrive/depart', section => {
            section.deviceSetting('presence').capability(['presenceSensor']).name('Who?');

        });


        page.section('Only between these times...', section => {
            section.timeSetting('startTime').name('Start Time');
            section.timeSetting('endTime').name('End Time');

        });


        page.section('Options', section => {
            section.booleanSetting('notify').name('Notification?');
            section.enumSetting('buttonMode').name('Button Function');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presence, 'presenceSensor', 'presence', 'checkTime')

    })

    .subscribedEventHandler('checkTime', (context, event) => {
        
        if (startTime && endTime ) {
        let currentTime = new Date()
        let startUTC = this.timeToday(startTime)
        let endUTC = this.timeToday(endTime)
        if (currentTime > startUTC && currentTime < endUTC && startUTC < endUTC || currentTime > startUTC && startUTC > endUTC || currentTime < endUTC && endUTC < startUTC ) {
        this.presenceAlarm(evt)
        }
        } else {
        this.presenceAlarm(evt)
        }
        

	})
