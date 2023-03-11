
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Trash door to monitor', section => {
            section.deviceSetting('contact').capability(['contactSensor']).name('Sensor to monitor');

        });


        page.section('On Which Days?', section => {
            section.enumSetting('days').name('Select Days of the Week');

        });


        page.section('Between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


        page.section('', section => {
            section.deviceSetting('sonos').capability(['musicPlayer']).name('On this Sonos player');

        });


        page.section('['hideable': true, 'hidden': true], 'More options', section => {
            section.booleanSetting('resumePlaying').name('Resume currently playing music after notification');
            section.numberSetting('volume').name('Temporarily change volume');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'contact.closed', 'closed')

        context.api.schedules.schedule('firstReminder', delay);

    })

    .subscribedEventHandler('closed', (context, event) => {
        
        log.trace("closed($evt)")
        let df = new java.text.SimpleDateFormat('EEEE')
        df.setTimeZone(location.timeZone)
        let today = df.format(new Date())
        if
        console.log("$today is not in $days")
        return null
        }
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (!between) {
        console.log("it is not between $fromTime and $toTime")
        return null
        }
        if (state.secondReminderScheduled) {
        console.log('unscheduling second reminder')
        this.unschedule(secondReminder)
        state.secondReminderScheduled = false
        }
        if (state.lastReminderScheduled) {
        console.log('unscheduling last reminder')
        this.unschedule(lastReminder)
        state.lastReminderScheduled = false
        }
        

	})

    .scheduledEventHandler('firstReminder', (context, event) => {
        
        log.trace('firstReminder()')
        this.speak('Master, tomorrow is the day. Don\'t forget to take out the trash. The best preparation for tomorrow is doing your best today.')
        this.notify('Tomorrow is the trash day. Don\'t forget to take out the trash.')
        state.secondReminderScheduled = true
        this.schedule('0 0 21 ? * WED *', secondReminder)
        

	})
