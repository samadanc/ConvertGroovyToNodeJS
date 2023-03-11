
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Configuration', section => {
            section.enumSetting('dayOfWeek').name('Which day of the week?');
            section.timeSetting('time').name('At this time');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('changeModeByDay', delay);

    })

    .scheduledEventHandler('changeModeByDay', (context, event) => {
        
        let doChange = false
        if (dayOfWeek == 'All Week') {
        doChange = true
        } else {
        if (dayOfWeek == 'Monday' || dayOfWeek == 'Monday to Friday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.MONDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Tuesday' || dayOfWeek == 'Monday to Friday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.TUESDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Wednesday' || dayOfWeek == 'Monday to Friday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.WEDNESDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Thursday' || dayOfWeek == 'Monday to Friday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.THURSDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Friday' || dayOfWeek == 'Monday to Friday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.FRIDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Saturday' || dayOfWeek == 'Saturday & Sunday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.SATURDAY) {
        doChange = true
        } else {
        if (dayOfWeek == 'Sunday' || dayOfWeek == 'Saturday & Sunday' && Calendar.instance.DAY_OF_WEEK == Calendar.instance.SUNDAY) {
        doChange = true
        }
        }
        }
        }
        }
        }
        }
        }
        console.log('Calendar DOW: ' + Calendar.instance.DAY_OF_WEEK)
        console.log('SET DOW: ' + dayOfWeek )
        if (doChange == true) {
        console.log("changeModeByDay, location.mode = ${location.mode}, newMode = $newMode, location.modes = ${location.modes}")
        if (location.mode != newMode ) {
        if (location.modes?.find({
        it.name == newMode
        })) {
        this.setLocationMode(newMode)
        this.send("$label has changed the mode to '$newMode'")
        } else {
        this.send("$label tried to change to undefined mode '$newMode'")
        }
        }
        } else {
        console.log('Mode change not scheduled for today.')
        }
        

	})
