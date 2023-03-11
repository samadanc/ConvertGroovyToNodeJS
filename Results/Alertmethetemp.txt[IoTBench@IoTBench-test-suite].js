
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alert me at:', section => {
            section.timeSetting('time1').name('When?');
            section.enumSetting('dayOfWeek').name('Which day of the week?');

        });


        page.section('Which sensor?', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduleCheck', delay);

    })

    .scheduledEventHandler('scheduleCheck', (context, event) => {
        
        log.trace("day of week: $dayOfWeek")
        let isTodaySelected = this.isTodaySelected(Calendar.instance.DAY_OF_WEEK)
        log.trace("isTodaySelected: $isTodaySelected")
        if (isTodaySelected) {
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', latestValue)
    
        log.trace("sending the temp: $currentTemp")
        let msg = "${temperatureSensor1.label} is currently at $currentTemp degrees"
        this.sendTextMessage(msg)
        }
        

	})
